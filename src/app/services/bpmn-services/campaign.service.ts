import { BucketActionToHTTPMethod } from "@google-cloud/storage/build/src/bucket";
import { Campaign } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CampaignRepository, DealRepository, GroupRepository } from "@repositories";
import { CAMPAIGN_REPOSITORY, DEAL_REPOSITORY, EMAIL_SERVICE, GROUP_REPOSITORY, SOCKET_SERVICE } from "@types";
import { CampaignCM, CampaignUM, CampaignVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from "typeorm";
import { EmailService, SocketService } from "../extra-services";

const jsdom = require('jsdom');
const {JSDOM} = jsdom;
@Injectable()
export class CampaignService {

  private readonly MARK_ASK_CONTACT_BUTTON_ID = "mask-contact-button";

  constructor(
    @Inject(CAMPAIGN_REPOSITORY) protected readonly campaignRepository: CampaignRepository,
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService,
    @Inject(GROUP_REPOSITORY) protected readonly groupRepository: GroupRepository,
    protected readonly emailService: EmailService,
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
    let result = {
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

    // let emailTemplateDOM = new DOMParser().parseFromString(emailTemplate, "text/html");
    // const maskContactButton = emailTemplateDOM.getElementById(this.MARK_ASK_CONTACT_BUTTON_ID);
    // if (!maskContactButton) {
    //   throw new NotFoundException("Can't element has id: "+ this.MARK_ASK_CONTACT_BUTTON_ID+ " in template.");
    // }

    let emailTemplateDOM = new JSDOM(emailTemplate);
    let maskContactButton = emailTemplateDOM.window.document.querySelector("#"+this.MARK_ASK_CONTACT_BUTTON_ID);


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