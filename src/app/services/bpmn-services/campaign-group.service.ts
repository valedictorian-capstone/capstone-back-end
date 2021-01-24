import { CampaignGroup } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CampaignGroupRepository, CampaignRepository, GroupRepository } from "@repositories";
import { DEAL_REPOSITORY, CAMPAIGN_GROUP_REPOSITORY } from "@types";
import { CampaignGroupCM, CampaignGroupUM, CampaignGroupVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

import { In } from "typeorm";

@Injectable()
export class CampaignGroupService {

  constructor(
    @Inject(CAMPAIGN_GROUP_REPOSITORY) protected readonly campaignGroupRepository: CampaignGroupRepository,
    @Inject(DEAL_REPOSITORY) protected readonly campaignRepository: CampaignRepository,
    @Inject(DEAL_REPOSITORY) protected readonly groupRepository: GroupRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<CampaignGroupVM[]> => {
    return await this.campaignGroupRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: ["group", "campaign"] })
      .then((models) => {
        return this.mapper.mapArray(models, CampaignGroupVM, CampaignGroup)
      });
  }

  public readonly findById = async (id: string): Promise<CampaignGroupVM> => {
    return await this.campaignGroupRepository.useHTTP().findOne({ where: { id: id }, relations: ["group", "campaign"] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, CampaignGroupVM, CampaignGroup)
        }
      })
  }

  public readonly insert = async (body: CampaignGroupCM): Promise<CampaignGroupVM> => {
    return await this.campaignGroupRepository.useHTTP().save(body as any)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly update = async (body: CampaignGroupUM): Promise<CampaignGroupVM> => {
    return await this.campaignGroupRepository.useHTTP()
      .save(body as any)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.campaignGroupRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.campaignGroupRepository.useHTTP()
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