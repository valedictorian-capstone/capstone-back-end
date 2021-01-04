



import { Campaign } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DealRepository, CampaignRepository, GroupRepository } from "@repositories";
import { DEAL_REPOSITORY, CAMPAIGN_REPOSITORY, SOCKET_SERVICE, GROUP_REPOSITORY, GROUP_SERVICE, EMAIL_SERVICE } from "@types";
import { CampaignCM, CampaignUM, CampaignVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

import { In } from "typeorm";
import { EmailService, SocketService } from "../extra-services";

@Injectable()
export class CampaignService {

  constructor(
    @Inject(CAMPAIGN_REPOSITORY) protected readonly campaignRepository: CampaignRepository,
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService,
    @Inject(GROUP_REPOSITORY) protected readonly groupRepository: GroupRepository,
    @Inject(EMAIL_SERVICE) protected readonly emailService: EmailService,
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

  public readonly sendCampaign = async (campaignId: string, groupIds: string[], emailTemplate: string) => {
    //As default send to all group of campagin
    //Check exists campaignId 
    const campaign = await this.campaignRepository.useHTTP().findOne(campaignId);
    if (!campaign) {
      throw new NotFoundException("CampaignId '"+ campaignId +"' is not exits ");
    }
    
    emailTemplate = emailTemplate != null? emailTemplate: campaign.emailTemplate;
    if (!emailTemplate) {
      throw new NotFoundException("Can't find Email Template in body request or Campagin Data");
    }

    const groups = await this.groupRepository.useHTTP().findByIds(groupIds, {relations: });
    if (groups.length == 0) {
      throw new NotFoundException("All Group Ids is not found.");
    }

    for (const group in groups) {
      
    }
    //Check exits groupId

  }
}