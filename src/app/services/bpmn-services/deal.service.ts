import { Deal } from "@models";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ActivityRepository, DealDetailRepository, DealRepository, LogRepository, ProductRepository, StageRepository } from "@repositories";
import { ACTIVITY_REPOSITORY, DEAL_DETAIL_REPOSITORY, DEAL_REPOSITORY, LOG_REPOSITORY, PRODUCT_REPOSITORY, SOCKET_SERVICE, STAGE_REPOSITORY } from "@types";
import { DealCM, DealUM, DealVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from 'typeorm';
import { SocketService } from "../extra-services";

@Injectable()
export class DealService {

  constructor(
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @Inject(STAGE_REPOSITORY) protected readonly stageRepository: StageRepository,
    @Inject(ACTIVITY_REPOSITORY) protected readonly activityRepository: ActivityRepository,
    @Inject(DEAL_DETAIL_REPOSITORY) protected readonly dealDetailRepository: DealDetailRepository,
    @Inject(PRODUCT_REPOSITORY) protected readonly productRepository: ProductRepository,
    @Inject(LOG_REPOSITORY) protected readonly logRepository: LogRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }

  public readonly findAll = async (): Promise<DealVM[]> => {
    return await this.dealRepository.useHTTP().find({ relations: ['stage', 'customer', 'dealDetails', 'logs', 'activitys', 'notes', 'attachments'] })
      .then(async (deals) => {
        for (let i = 0; i < deals.length; i++) {
          const deal = deals[i];
          if (deal.dealDetails.length > 0) {
            deal.dealDetails = await this.dealDetailRepository.useHTTP().find({ where: { id: In(deal.dealDetails.map((e) => e.id)) }, relations: ['product'] });

          }
        }
        return this.mapper.mapArray(deals, DealVM, Deal);
      }
      )
  }
  public readonly findById = async (id: string): Promise<DealVM> => {
    return await this.dealRepository.useHTTP().findOne({ where: { id: id }, relations: ['stage', 'customer', 'dealDetails', 'logs', 'activitys', 'notes', 'attachments'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          model.dealDetails = await this.dealDetailRepository.useHTTP().find({ where: { id: In(model.dealDetails.map((e) => e.id)) }, relations: ['product'] });
          return this.mapper.map(model, DealVM, Deal)
        }
      })
  }
  public readonly findByStage = async (id: string): Promise<DealVM[]> => {
    return await this.dealRepository.useHTTP().find({ where: { stage: { id } }, relations: ['stage', 'customer', 'dealDetails'] })
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
        await this.dealDetailRepository.useHTTP().save(body.dealDetails.map((e) => ({ ...e, deal: model })) as any);
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
      return await this.dealRepository.useHTTP().findOne({ id: (body as DealUM).id }, { relations: ['stage'] })
        .then(async (oldModel) => {
          if (!oldModel) {
            throw new NotFoundException(
              `Can not find ${(body as DealUM).id}`,
            );
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
  private readonly saveLog = async (oldDeal: Deal, updateDeal: Deal) => {
    let description = "";
    if (oldDeal.stage != updateDeal.stage && oldDeal.stage && updateDeal.stage) {
      const oldStage = await this.stageRepository.useHTTP().findOne({ id: oldDeal.stage.id });
      const updateStage = await this.stageRepository.useHTTP().findOne({ id: updateDeal.stage.id });
      description = "Stage: " + oldStage.name + ' -> ' + updateStage.name;
    }
    if (oldDeal.status != updateDeal.status) {
      description = "Status: " + oldDeal.status + ' -> ' + updateDeal.status;
    }
    const log = {
      description: description,
      deal: updateDeal
    }
    await this.logRepository.useHTTP().save(log);
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
}