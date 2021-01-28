
import { Campaign, Deal } from '@models';
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import { CampaignGroupRepository, CampaignRepository, CustomerRepository, DealRepository, GroupRepository, StageRepository } from "@repositories";
import { CAMPAIGN_GROUP_REPOSITORY, CAMPAIGN_REPOSITORY, CUSTOMER_REPOSITORY, DEAL_REPOSITORY, GROUP_REPOSITORY, SOCKET_SERVICE, STAGE_REPOSITORY } from "@types";
import { CampaignCM, CampaignUM, CampaignVM, DealVM } from "@view-models";
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
    @Inject(CAMPAIGN_GROUP_REPOSITORY) protected readonly campaignGroupRepository: CampaignGroupRepository,
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(CUSTOMER_REPOSITORY) protected readonly customerRepository: CustomerRepository,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService,
    @Inject(CUSTOMER_REPOSITORY) protected readonly cusomterRepository: CustomerRepository,
    @Inject(STAGE_REPOSITORY) protected readonly stageRepository: StageRepository,
    @Inject(GROUP_REPOSITORY) protected readonly groupRepository: GroupRepository,
    protected readonly emailService: EmailService
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<CampaignVM[]> => {
    return await this.campaignRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: ["campaignGroups", "campaignGroups.group", "pipeline", "pipeline.stages"] })
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
    return await this.campaignRepository.useHTTP().findOne({ where: { id: id }, relations: ["campaignGroups", "pipeline", "campaignGroups.group", "pipeline.stages", 'followers', 'followers.groups'] })
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
  public readonly statistical = async (id: string): Promise<any> => {
    return await this.campaignRepository.useHTTP().findOne({ where: { id: id }, relations: ['deals', 'deals.customer', 'deals.customer.groups', 'deals.dealDetails', 'deals.dealDetails.product', 'followers', 'campaignGroups', 'campaignGroups.group', 'campaignGroups.group.customers', 'campaignGroups.group.customers.groups'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return {
            total: [model.deals.filter((e) => e.status === 'processing'), model.deals.filter((e) => e.status === 'won'), model.deals.filter((e) => e.status === 'lost'), model.deals.filter((e) => e.status === 'expired')],
            totalValue: this.transform(model.deals.filter((e) => e.status === 'won' && e.feedbackStatus === 'resolve')),
            totalGroupValues: model.campaignGroups.map((campaignGroup) => ({
              name: campaignGroup.group.name,
              value: this.transform(model.deals.filter((e) => e.status === 'won' && e.feedbackStatus === 'resolve' && e.customer.groups.filter((gr) => gr.id === campaignGroup.group.id).length > 0)),
            }))
          };
        }
      })
  }
  private readonly transform = (value: Deal[]) => {
    return new Intl.NumberFormat('en', {
      minimumFractionDigits: 0
    }).format(Number(value && value.length > 0 ? value
      .map((deal) => (deal.dealDetails.length > 0 ? deal.dealDetails
        .map((e) => e.quantity * e.product.price)
        .reduce((p, c) => (p + c)) : 0))
      .reduce((p, c) => (p + c)) : 0));
  }
  public readonly query = async (key: string, id: string): Promise<CampaignVM[]> => {
    return await this.campaignRepository.useHTTP().find({
      where: key && id ? {
        [key]: { id }
      } : {},
      relations: ["campaignGroups", "pipeline", "pipeline.stages"],
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
    return await this.campaignRepository.useHTTP().findOne({ id: body.id }, { relations: ['campaignGroups'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        if (body.campaignGroups) {
          await this.campaignGroupRepository.useHTTP().remove(model.campaignGroups);
          await this.campaignGroupRepository.useHTTP().insert(body.campaignGroups as any);
        }
        return await this.campaignRepository.useHTTP()
          .save(body as any)
          .then(async (model) => {
            const rs = await this.findById(model.id);
            this.socketService.with('campaigns', rs, 'update');
            return rs;
          })
      });
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
    const listCamp = await this.campaignRepository.useHTTP().query("SELECT id FROM crm.campaign WHERE YEAR(dateStart) = YEAR(NOW()) AND MONTH(dateStart) = MONTH(NOW()) AND DAY(dateStart) = DAY(NOW()) AND HOUR(dateStart) = HOUR(NOW()) AND MINUTE(dateStart) = MINUTE(NOW()) AND status = 'planning'");
    const ids = listCamp.map((e) => e.id);
    if (ids.length != 0) {
      const campaigns = await this.campaignRepository.useHTTP().find({ where: { id: In(ids) }, relations: ["campaignGroups", "pipeline", "campaignGroups.group", "campaignGroups.group.customers"] });
      const rs = [];
      for (let index = 0; index < campaigns.length; index++) {
        const campaign = campaigns[index];
        await this.campaignRepository.useHTTP().save({ ...campaign, status: "active" });
        if (campaign.campaignGroups != null && campaign.autoCreateDeal == true) {
          const stage = await this.stageRepository.useHTTP().findOne({ where: { position: 0, pipeline: campaign.pipeline } });
          console.log("campaign.campaignGroups");
          console.log(campaign.campaignGroups);
          const groupIds = campaign.campaignGroups.map(item => item.group.id);
          this.sendCampaign(campaign.id, groupIds, null);
          for (let index1 = 0; index1 < campaign.campaignGroups.length; index1++) {
            const group = campaign.campaignGroups[index1].group;
            for (let index2 = 0; index2 < group.customers.length; index2++) {
              const customer = group.customers[index2];
              const deal = {
                customer: customer,
                campaign: campaign,
                title: customer.fullname + "_" + campaign.name,
                stage: stage,
                status: "processing"
              }
              const dealCreated = await this.dealRepository.useHTTP().save({ ...deal });
              rs.push(this.mapper.map(await this.dealRepository.useHTTP().findOne({ where: { id: dealCreated.id }, relations: ['stage', 'stage.pipeline', 'stage.pipeline.stages', 'customer', 'dealDetails', 'dealDetails.product', 'logs', 'activitys', 'activitys.assignee', 'activitys.assignBy', 'notes', 'attachments', 'assignee', 'feedbackAssignee', 'campaign'] }), DealVM, Deal));
            }
          }
        }
      }
      this.socketService.with('deals', rs, 'list');
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCronTriggerEndTime() {
    const listCamp = await this.campaignRepository.useHTTP().query("SELECT id FROM crm.campaign WHERE YEAR(dateEnd) = YEAR(NOW()) AND MONTH(dateEnd) = MONTH(NOW()) AND DAY(dateEnd) = DAY(NOW()) AND HOUR(dateEnd) = HOUR(NOW()) AND MINUTE(dateEnd) = MINUTE(NOW()) AND status = 'active'");
    const ids = listCamp.map((e) => e.id);
    if (ids.length != 0) {
      const campaigns = await this.campaignRepository.useHTTP().find({ where: { id: In(ids) }, relations: ["campaignGroups"] });
      const rs = [];
      for (let index = 0; index < campaigns.length; index++) {
        const campaign = campaigns[index];
        await this.campaignRepository.useHTTP().save({ ...campaign, status: "complete" });
        if (campaign.campaignGroups != null) {
          const deals = await this.dealRepository.useHTTP().find({ where: { campaign: campaign } });
          if (deals.length != 0) {
            const dealsUpdate = [];
            for (let index1 = 0; index1 < deals.length; index1++) {
              const deal = deals[index1];
              if (deal.status == 'processing') {
                deal.status = "expired";
                dealsUpdate.push(deal);
              }
            }
            if (dealsUpdate.length != 0) {
              const dealUpdated = await this.dealRepository.useHTTP().save(dealsUpdate as any) as Deal;
              rs.push(this.mapper.map(await this.dealRepository.useHTTP().findOne({ where: { id: dealUpdated.id }, relations: ['stage', 'stage.pipeline', 'stage.pipeline.stages', 'customer', 'dealDetails', 'dealDetails.product', 'logs', 'activitys', 'activitys.assignee', 'activitys.assignBy', 'notes', 'attachments', 'assignee', 'feedbackAssignee', 'campaign'] }), DealVM, Deal));
            }
          }
        }
      }
      this.socketService.with('deals', rs, 'list');
    }
  }

  public readonly sendCampaign = async (campaignId: string, groupIds: string[], emailTemplate: string) => {
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
    emailTemplate += "<div style='width: 100%; height: 5rem; margin-top: 1rem;'><a id='mask-contact-button' style='text-decoration: none; border-radius: 5px; border: 1px solid #e5e5e5; padding: 1rem; color: black;'>Follow Campaign</a></div>";
    const emailTemplateDOM = new JSDOM(emailTemplate);
    const maskContactButton = emailTemplateDOM.window.document.querySelector("#" + this.MARK_ASK_CONTACT_BUTTON_ID);

    const groups = await this.groupRepository.useHTTP().findByIds(groupIds, { relations: ["customers"] });
    if (groups.length == 0) {
      throw new NotFoundException("All Group Ids is not found.");
    }

    for await (const group of groups) {
      for await (const customer of group.customers) {
        //set email template
        const buttonPath = await this.maskContactURLBuilder(campaignId, customer.id);
        if (maskContactButton) {
          maskContactButton.setAttribute("href", buttonPath);
        }
        //send email
        console.log('Send email campagin for customer id: '+ customer.id + ' campaign Id: ' + campaignId)
        await this.emailService.sendEmailToCustomerByCustomerId(customer.id, emailTemplateDOM.serialize());
      }
    }
  }

  private readonly maskContactURLBuilder = async (campaignId: string, userId: string): Promise<string> => {
    return process.env.CRM_WS_HOST + "/#/core/thank-you/" + userId + "/" + campaignId;
  }

  public readonly maskCustomerAsContactGroup = async (campaignId: string, customerId: string) => {
    //check campain Id
    const campaign = await this.campaignRepository.useHTTP().findOne(campaignId);
    if (!campaign) {
      throw new NotFoundException("Campain Id " + campaignId + " is not found");
    }
    //check exits user
    const customer = await this.customerRepository.useHTTP().findOne({ where: { id: customerId }, relations: ["groups", "followingCampaigns"] })
      if (!customer) {
        throw new NotFoundException("CustomerId is not found");
      }
    const campaignRelation = { id: campaign.id };
    customer.followingCampaigns.push(campaignRelation as any);
    await this.customerRepository.useHTTP().save(customer);
    this.socketService.with('campaigns', await this.findById(campaignId), 'update');
  }
}