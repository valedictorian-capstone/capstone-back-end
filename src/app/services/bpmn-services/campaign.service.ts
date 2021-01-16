
import { Campaign } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import { CampaignRepository, CustomerRepository, DealRepository, GroupRepository, StageRepository } from "@repositories";
import { CAMPAIGN_REPOSITORY, CUSTOMER_REPOSITORY, DEAL_REPOSITORY, GROUP_REPOSITORY, SOCKET_SERVICE, STAGE_REPOSITORY } from "@types";
import { CampaignCM, CampaignUM, CampaignVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from "typeorm";
import { EmailService, SocketService } from "../extra-services";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
@Injectable()
export class CampaignService {

  private readonly MARK_ASK_CONTACT_BUTTON_ID = "mask-contact-button";

  constructor(
    @Inject(CAMPAIGN_REPOSITORY) protected readonly campaignRepository: CampaignRepository,
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService,
    @Inject(CUSTOMER_REPOSITORY) protected readonly cusomterRepository: CustomerRepository,
    @Inject(STAGE_REPOSITORY) protected readonly stageRepository: StageRepository,
    @Inject(GROUP_REPOSITORY) protected readonly groupRepository: GroupRepository,
    protected readonly emailService: EmailService
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<CampaignVM[]> => {
    return await this.campaignRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: ["groups", "pipeline", "pipeline.stages"] })
      .then((models) => {
        for (let i = 0; i < models.length; i++) {
          const model = models[i];
          const stages = model.pipeline.stages;
          model.pipeline.stages = stages.sort((a, b) => a.position - b.position);
        }
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
    return await this.campaignRepository.useHTTP().findOne({ where: { id: id }, relations: ["groups", "pipeline", "pipeline.stages"] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          const stages = model.pipeline.stages;
          model.pipeline.stages = stages.sort((a, b) => a.position - b.position);
          return this.mapper.map(model, CampaignVM, Campaign)
        }
      })
  }
  public readonly query = async (key: string, id: string): Promise<CampaignVM[]> => {
    return await this.campaignRepository.useHTTP().find({
      where: key && id ? {
        [key]:  { id }
      } : {},
      relations: ["groups", "pipeline", "pipeline.stages"],
    })
      .then((models) => {
        for (let i = 0; i < models.length; i++) {
          const model = models[i];
          const stages = model.pipeline.stages;
          model.pipeline.stages = stages.sort((a, b) => a.position - b.position);
        }
        return this.mapper.mapArray(models, CampaignVM, Campaign);
      })
  };
  public readonly insert = async (body: CampaignCM): Promise<CampaignVM> => {
    return await this.campaignRepository.useHTTP().save(body as any)
      .then(async (model) => {
        const rs = await this.findById(model.id);
        this.socketService.with('campaigns', rs, 'create');
        return rs;
      })
  }

  public readonly update = async (body: CampaignUM): Promise<CampaignVM> => {
    return await this.campaignRepository.useHTTP()
      .save(body as any)
      .then(async (model) => {
        const rs = await this.findById(model.id);
        this.socketService.with('campaigns', rs, 'update');
        return rs;
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
            const rs = this.mapper.map({ ...model, id } as Campaign, CampaignVM, Campaign);
            this.socketService.with('campaigns', rs, 'remove');
            return rs;
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
          const stage = await this.stageRepository.useHTTP().findOne({ where: { position: 1, pipeline: campaign.pipeline } });
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
          const deals = await this.dealRepository.useHTTP().find({ where: { campaign: campaign } });
          if (deals.length != 0) {
            const dealsUpdate = [];
            for (let index1 = 0; index1 < deals.length; index1++) {
              const deal = deals[index1];
              if (deal.status != "win" && deal.status != "lost") {
                deal.status = "expired";
                dealsUpdate.push(deal);
              }
            }
            if (dealsUpdate.length != 0) {
              await this.dealRepository.useHTTP().save(dealsUpdate);
            }
          }
        }
      }
    }
  }

  public readonly sendCampaign = async (campaignId: string, groupIds: string[], emailTemplate: string) => {
    const result = {
      success: 0,
      fail: 0,
      errors: []
    }
    //As default send to all group of campagin
    //Check exists campaignId 
    const campaign = await this.campaignRepository.useHTTP().findOne(campaignId);
    if (!campaign) {
      throw new NotFoundException("CampaignId '" + campaignId + "' is not exits ");
    }

    emailTemplate = emailTemplate != null ? emailTemplate : campaign.emailTemplate;
    if (!emailTemplate) {
      throw new NotFoundException("Can't find Email Template in body request or Campagin Data");
    }

    const emailTemplateDOM = new JSDOM(emailTemplate);
    const maskContactButton = emailTemplateDOM.window.document.querySelector("#" + this.MARK_ASK_CONTACT_BUTTON_ID);


    const groups = await this.groupRepository.useHTTP().findByIds(groupIds, { relations: ["customers"] });
    if (groups.length == 0) {
      throw new NotFoundException("All Group Ids is not found.");
    }

    for await (const group of groups) {
      for await (const customer of group.customers) {
        try {
          //set email template
          const buttonPath = await this.maskContactURLBuilder(campaignId, customer.id);
          maskContactButton.setAttribute("href", buttonPath);

          //send email
          await this.emailService.sendEmailToCustomerByCustomerId(customer.id, emailTemplateDOM.serialize());
          result.success = result.success + 1;
        } catch (error) {
          console.log(error)
          result.fail = result.fail + 1;
          result.errors.push(error)
        }
      }
    }
    groupIds.filter(item => groups.find(group => group.id == item))
    return result;
  }

  private readonly maskContactURLBuilder = async (campaignId: string, userId: string): Promise<string> => {
    return process.env.CRM_WS_HOST + "/contact/" + userId + "/" + campaignId;
  }
}