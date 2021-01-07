import { Campaign, Deal } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DealRepository, CampaignRepository, CustomerRepository, StageRepository } from "@repositories";
import { DEAL_REPOSITORY, CAMPAIGN_REPOSITORY, SOCKET_SERVICE, CUSTOMER_REPOSITORY, STAGE_REPOSITORY } from "@types";
import { CampaignCM, CampaignUM, CampaignVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { Cron, CronExpression } from '@nestjs/schedule';

import { In } from "typeorm";
import { SocketService } from "../extra-services";

@Injectable()
export class CampaignService {

  constructor(
    @Inject(CAMPAIGN_REPOSITORY) protected readonly campaignRepository: CampaignRepository,
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService,
    @Inject(CUSTOMER_REPOSITORY) protected readonly cusomterRepository: CustomerRepository,
    @Inject(STAGE_REPOSITORY) protected readonly stageRepository: StageRepository
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<CampaignVM[]> => {
    return await this.campaignRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: ["groups"] })
      .then((models) => {
        return this.mapper.mapArray(models, CampaignVM, Campaign)
      });
  }

  public readonly findByDeal = async (id: string): Promise<CampaignVM[]> => {

    return await this.campaignRepository.useHTTP().find({ where: { deal: { id } }, relations: [] })
      .then((models) => {
        return this.mapper.mapArray(models, CampaignVM, Campaign)
      });
  }

  public readonly findById = async (id: string): Promise<CampaignVM> => {
    return await this.campaignRepository.useHTTP().findOne({ where: { id: id }, relations: ["groups"] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, CampaignVM, Campaign)
        }
      })
  }

  public readonly insert = async (body: CampaignCM): Promise<CampaignVM> => {
    return await this.campaignRepository.useHTTP().save(body as any)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly update = async (body: CampaignUM): Promise<CampaignVM> => {
    return await this.campaignRepository.useHTTP()
      .save(body as any)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.campaignRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.campaignRepository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCronTriggerStartTime() {
    const listCamp = await this.campaignRepository.useHTTP().query('SELECT id FROM crm.campaign WHERE YEAR(dateStart) = YEAR(NOW()) AND MONTH(dateStart) = MONTH(NOW()) AND DAY(dateStart) = DAY(NOW()) AND HOUR(dateStart) = HOUR(NOW()) AND MINUTE(dateStart) = MINUTE(NOW())');
    const ids = listCamp.map((e) => e.id);
    if (ids.length != 0) {
      const campaigns = await this.campaignRepository.useHTTP().find({ where: { id: In(ids) }, relations: ["groups", "pipeline", "groups.customers"] });
      for (let index = 0; index < campaigns.length; index++) {
        const campaign = campaigns[index];
        if (campaign.groups != null) {
          const stage = await this.stageRepository.useHTTP().findOne({ where: {position: 1, pipeline: campaign.pipeline }});
          for (let index1 = 0; index1 < campaign.groups.length; index1++) {
            const group = campaign.groups[index1];
            for (let index2 = 0; index2 < group.customers.length; index2++) {
              const customer = group.customers[index2];
              const deal = {
                customer: customer,
                campaign: campaign,
                title: customer.fullname + "_" + campaign.name,
                stage: stage,
                status: "processing"
              }
              await this.dealRepository.useHTTP().save({ ...deal });
            }
          }
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCronTriggerEndTime() {
    const listCamp = await this.campaignRepository.useHTTP().query('SELECT id FROM crm.campaign WHERE YEAR(dateEnd) = YEAR(NOW()) AND MONTH(dateEnd) = MONTH(NOW()) AND DAY(dateEnd) = DAY(NOW()) AND HOUR(dateEnd) = HOUR(NOW()) AND MINUTE(dateEnd) = MINUTE(NOW())');
    const ids = listCamp.map((e) => e.id);
    if (ids.length != 0) {
      const campaigns = await this.campaignRepository.useHTTP().find({ where: { id: In(ids) }, relations: ["groups", "pipeline", "groups.customers"] });
      for (let index = 0; index < campaigns.length; index++) {
        const campaign = campaigns[index];
        if (campaign.groups != null) {
          const deals = await this.dealRepository.useHTTP().find({ where: { campaign: campaign }});
          if(deals.length != 0){
            const dealsUpdate= [];
            for (let index1 = 0; index1 < deals.length; index1++) {
              const deal = deals[index1];
              if( deal.status != "win" && deal.status != "lost" ){
                deal.status = "expired";
                dealsUpdate.push(deal);
              }              
            }
            if(dealsUpdate.length != 0){
              await this.dealRepository.useHTTP().save(dealsUpdate);
            }
          }
        }
      }
    }
  }
}