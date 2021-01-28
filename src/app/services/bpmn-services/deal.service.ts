import { Deal } from "@models";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ActivityRepository, CustomerRepository, DealDetailRepository, DealRepository, LogRepository, ProductRepository, StageRepository } from "@repositories";
import { ACTIVITY_REPOSITORY, CUSTOMER_REPOSITORY, DEAL_DETAIL_REPOSITORY, DEAL_REPOSITORY, LOG_REPOSITORY, PRODUCT_REPOSITORY, SOCKET_SERVICE, STAGE_REPOSITORY } from "@types";
import { DealCM, DealUM, DealVM, EmployeeVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from 'typeorm';
import { CustomerService } from '../customer-services';
import { SocketService } from "../extra-services";

@Injectable()
export class DealService {

  constructor(
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @Inject(STAGE_REPOSITORY) protected readonly stageRepository: StageRepository,
    @Inject(ACTIVITY_REPOSITORY) protected readonly activityRepository: ActivityRepository,
    @Inject(DEAL_DETAIL_REPOSITORY) protected readonly dealDetailRepository: DealDetailRepository,
    @Inject(PRODUCT_REPOSITORY) protected readonly productRepository: ProductRepository,
    @Inject(CUSTOMER_REPOSITORY) protected readonly customerRepository: CustomerRepository,
    @Inject(LOG_REPOSITORY) protected readonly logRepository: LogRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService,
    protected readonly customerService: CustomerService
  ) { }
  public readonly findAll = async (requester: EmployeeVM): Promise<DealVM[]> => {
    return await this.dealRepository.useHTTP().find({ relations: ['stage', 'stage.pipeline', 'stage.pipeline.stages', 'customer', 'dealDetails', 'logs', 'activitys', 'activitys.assignee', 'activitys.assignBy', 'notes', 'attachments', 'assignee', 'campaign'] })
      .then(async (deals) => {
        const canGetAllDeal = requester.roles.filter((e) => e.canGetAllDeal).length > 0;
        const canGetFeedbackDeal = requester.roles.filter((e) => e.canGetFeedbackDeal).length > 0;
        const canGetAssignDeal = requester.roles.filter((e) => e.canGetAssignDeal).length > 0;
        if (!canGetAllDeal) {
          if (!canGetFeedbackDeal && !canGetAssignDeal) {
            deals = [];
          } else if (canGetFeedbackDeal || canGetAssignDeal) {
            if (canGetFeedbackDeal) {
              deals = deals.filter((deal) => deal.status === 'won' || deal.status === 'lost');
            }
            if (canGetAssignDeal) {
              deals = deals.filter((deal) => deal.assignee.id === requester.id);
            }
          }
        }
        for (let i = 0; i < deals.length; i++) {
          const deal = deals[i];
          const stages = deal.stage.pipeline.stages;
          deal.stage.pipeline.stages = stages.sort((a, b) => a.position - b.position);
          if (deal.dealDetails.length > 0) {
            deal.dealDetails = await this.dealDetailRepository.useHTTP().find({ where: { id: In(deal.dealDetails.map((e) => e.id)) }, relations: ['product'] });

          }
        }
        return this.mapper.mapArray(deals, DealVM, Deal);
      }
      )
  }
  public readonly findById = async (id: string): Promise<DealVM> => {
    return await this.dealRepository.useHTTP().findOne({ where: { id: id }, relations: ['stage', 'stage.pipeline', 'stage.pipeline.stages', 'customer', 'dealDetails', 'dealDetails.product', 'logs', 'activitys', 'activitys.assignee', 'activitys.assignBy', 'notes', 'attachments', 'assignee', 'feedbackAssignee', 'campaign'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          // model.dealDetails = await this.dealDetailRepository.useHTTP().find({ where: { id: In(model.dealDetails.map((e) => e.id)) }, relations: ['product'] });
          const stages = model.stage.pipeline.stages;
          model.stage.pipeline.stages = stages.sort((a, b) => a.position - b.position);
          return this.mapper.map(model, DealVM, Deal)
        }
      })
  }
  public readonly query = async (key: string, id: string): Promise<DealVM[]> => {
    return await this.dealRepository.useHTTP().find({
      where: key && id ? {
        [key]: { id }
      } : {},
      relations: ['stage', 'stage.pipeline', 'stage.pipeline.stages', 'customer', 'dealDetails', 'dealDetails.product', 'logs', 'activitys', 'activitys.assignee', 'activitys.assignBy', 'notes', 'attachments', 'assignee', 'campaign'],
    })
      .then((models) => {
        return this.mapper.mapArray(models, DealVM, Deal);
      })
  };
  public readonly findByCustomerId = async (id: string): Promise<DealVM[]> => {
    return await this.dealRepository.useHTTP().find({ where: { customer: { id } }, relations: ['stage', 'customer', 'dealDetails', 'logs', 'activitys', 'notes', 'attachments', 'assignee', 'campaign'] })
      .then(async (deals) => {
        for (let i = 0; i < deals.length; i++) {
          const deal = deals[i];
          if (deal.dealDetails.length > 0) {
            deal.dealDetails = await this.dealDetailRepository.useHTTP().find({ where: { id: In(deal.dealDetails.map((e) => e.id)) }, relations: ['product'] });

          }
        }
        return this.mapper.mapArray(deals, DealVM, Deal);
      });
  }
  public readonly findByStage = async (id: string, requester: EmployeeVM): Promise<DealVM[]> => {
    const query = {};
    if (requester.roles.filter((e) => e.canAccessDeal && e.canGetAllDeal).length === 0) {
      query['assignee'] = { id: requester.id };
    }
    return await this.dealRepository.useHTTP().find({ where: { stage: { id }, ...query }, relations: ['stage', 'customer', 'dealDetails', 'assignee', 'campaign'] })
      .then(async (deals) => {
        for (let i = 0; i < deals.length; i++) {
          const deal = deals[i];
          deal.dealDetails = await this.dealDetailRepository.useHTTP().find({ where: { id: In(deal.dealDetails.map((e) => e.id)) }, relations: ['product'] });
          if (deal.dealDetails.length > 0) {
            console.log(deal.dealDetails);
          }
        }
        return await this.mapper.mapArray(deals, DealVM, Deal);
      });
  }
  public readonly insert = async (body: DealCM): Promise<DealVM> => {
    return await this.dealRepository.useHTTP()
      .save(body as any)
      .then(async (model) => {

        const log = {
          description: "Deal created",
          deal: model
        }
        await this.logRepository.useHTTP().save(log);
        const rs = await this.findById(model.id);
        this.socketService.with('deals', rs, 'create');
        return rs;
      })
  }
  public readonly update = async (body: DealUM | DealUM[]): Promise<DealVM | DealVM[]> => {
    if ((body as DealUM[]).length) {
      const rs = [];
      for (let i = 0; i < (body as DealUM[]).length; i++) {
        const deal = body[i];
        const oldModel = await this.dealRepository.useHTTP().findOne({ id: deal.id }, { relations: ['stage'] });
        await this.dealRepository.useHTTP()
          .save(deal as any)
          .then(async (newModel) => {
            await this.saveLog(oldModel, { ...newModel, stage: deal.stage ? deal.stage : oldModel.stage });
            await rs.push(await this.findById(deal.id));
          })
      }
      this.socketService.with('deals', rs, 'list');
      return rs;
    } else {
      return await this.dealRepository.useHTTP().findOne({ id: (body as DealUM).id }, { relations: ['stage', 'dealDetails'] })
        .then(async (oldModel) => {
          if (!oldModel) {
            throw new NotFoundException(
              `Can not find ${(body as DealUM).id}`,
            );
          }
          if ((body as DealUM).dealDetails) {
            await this.dealDetailRepository.useHTTP().remove(oldModel.dealDetails);
            await this.dealDetailRepository.useHTTP().insert((body as DealUM).dealDetails);
          }
          return await this.dealRepository.useHTTP()
            .save(body as any)
            .then(async (newModel) => {
              this.saveLog(oldModel, { ...newModel, stage: (body as DealUM).stage ? (body as DealUM).stage : oldModel.stage });
              const rs = await this.findById(newModel.id);
              this.socketService.with('deals', rs, 'update');
              return rs;
            })
        });
    }
  }
  private readonly updateCustomerGroupWhenDone = async (deal: Deal) => {
    return await this.dealRepository.useHTTP().findOne({ id: deal.id }, { relations: ['customer', 'dealDetails'] }).then(async (deal) => {
      if (deal.status === 'won') {
        const customer = deal.customer;
        customer.totalDeal = customer.totalDeal + 1;
        customer.frequency = (customer.frequency * 365 + 1) / 365;
        let totalPrice = 0
        if (deal.dealDetails.length > 0) {
          deal.dealDetails = await this.dealDetailRepository.useHTTP().find({ where: { id: In(deal.dealDetails.map((e) => e.id)) }, relations: ['product'] });
          for (let i = 0; i < deal.dealDetails.length; i++) {
            const dealDetail = deal.dealDetails[i];
            totalPrice = totalPrice + (dealDetail.quantity * dealDetail.product.price);
          }
        }
        customer.totalSpending = customer.totalSpending + totalPrice;
        console.log("total deal after finish of won" + customer.totalDeal);
        await this.customerService.reClassify(customer);
      }
      if (deal.status === 'lost') {
        const customer = deal.customer;
        customer.totalDeal = customer.totalDeal + 1;
        console.log("total deal after finish of lost" + customer.totalDeal);
        await this.customerService.reClassify(customer);
      }
    })
  }
  private readonly updateCustomerGroupWhenReOpen = async (deal: Deal, oldStatus: string) => {
    return await this.dealRepository.useHTTP().findOne({ id: deal.id }, { relations: ['customer', 'dealDetails'] }).then(async (deal) => {

      if (oldStatus === 'won') {
        const customer = deal.customer;
        customer.totalDeal = customer.totalDeal - 1;
        customer.frequency = (customer.frequency * 365 - 1) / 365;
        let totalPrice = 0
        if (deal.dealDetails.length > 0) {
          deal.dealDetails = await this.dealDetailRepository.useHTTP().find({ where: { id: In(deal.dealDetails.map((e) => e.id)) }, relations: ['product'] });
          for (let i = 0; i < deal.dealDetails.length; i++) {
            const dealDetail = deal.dealDetails[i];
            totalPrice = totalPrice + (dealDetail.quantity * dealDetail.product.price);
          }
        }
        customer.totalSpending = customer.totalSpending - totalPrice;
        console.log("total deal after reopen of won" + customer.totalDeal);
        await this.customerService.reClassify(customer);
      }
      if (oldStatus === 'lost') {
        const customer = deal.customer;
        customer.totalDeal = customer.totalDeal - 1;
        console.log("total deal after reopen of lost" + customer.totalDeal);
        await this.customerService.reClassify(customer);
      }
    })
  }
  private readonly saveLog = async (oldDeal: Deal, updateDeal: Deal) => {
    console.log("test save log beggin");
    let description = "";
    if (oldDeal.stage.id != updateDeal.stage.id && oldDeal.stage && updateDeal.stage) {
      const oldStage = await this.stageRepository.useHTTP().findOne({ id: oldDeal.stage.id });
      const updateStage = await this.stageRepository.useHTTP().findOne({ id: updateDeal.stage.id });
      description = "Stage: " + oldStage.name + ' -> ' + updateStage.name;
    }
    if (oldDeal.status != updateDeal.status) {
      description = "Status: " + oldDeal.status + ' -> ' + updateDeal.status;
      if (oldDeal.status === 'processing') {
        this.updateCustomerGroupWhenDone(updateDeal);
      } else {
        console.log("test reOpen");
        this.updateCustomerGroupWhenReOpen(updateDeal, oldDeal.status);
      }
    }
    const log = {
      description: description,
      deal: updateDeal
    }
    await this.logRepository.useHTTP().save(log).then(async (res) => {
      this.socketService.with('logs', await this.logRepository.useHTTP().findOne({ id: res.id }, { relations: ['deal'] }), 'create');
    });
  }
  public readonly remove = async (id: string): Promise<any> => {
    return await this.dealRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.dealRepository.useHTTP()
          .save({ id, isDelete: true })
          .then(async (model) => {
            const rs = await this.findById(model.id);
            this.socketService.with('deals', rs, 'update');
            return rs;
          })
      });
  }
  public readonly restore = async (id: string): Promise<any> => {
    return await this.dealRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.dealRepository.useHTTP()
          .save({ id, isDelete: false })
          .then(async (model) => {
            const rs = await this.findById(model.id);
            this.socketService.with('deals', rs, 'update');
            return rs;
          })
      });
  }

  public readonly createDealsForGroup = async (groupId: string, dealCM: DealCM) => {
    const result = {
      success: 0,
      fail: 0,
      total: 0
    }

    const customerList = await this.customerRepository.useHTTP()
      .createQueryBuilder("customer")
      .innerJoinAndSelect("customer", "customerGroup", "customerGroup.id = :groupId", { groupId: groupId })
      .getMany()
    result.total = customerList.length
    for await (const customer of customerList) {
      const deal = new Deal();
      await Object.assign(deal, dealCM)
      deal.customer = customer

      this.dealRepository.useHTTP().save(deal as any).then(
        async () => {
          result.success++;
        }
      ).catch(
        (error) => {
          console.log(error)
          result.fail++;
        }
      );
    }
    return result;
  }
}