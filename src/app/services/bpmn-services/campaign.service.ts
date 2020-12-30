



import { Campaign } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DealRepository, CampaignRepository } from "@repositories";
import { DEAL_REPOSITORY, CAMPAIGN_REPOSITORY, SOCKET_SERVICE } from "@types";
import { CampaignCM, CampaignUM, CampaignVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

import { In } from "typeorm";
import { SocketService } from "../extra-services";

@Injectable()
export class CampaignService {

  constructor(
    @Inject(CAMPAIGN_REPOSITORY) protected readonly campaignRepository: CampaignRepository,
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<CampaignVM[]> => {
    return await this.campaignRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: [] })
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
    return await this.campaignRepository.useHTTP().findOne({ where: { id: id }, relations: [] })
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
}