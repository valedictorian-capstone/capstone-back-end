import { Inject, Injectable } from "@nestjs/common";
import { ActivityRepository, AttachmentRepository, CustomerRepository, DealRepository } from "@repositories";
import { ACTIVITY_REPOSITORY, ATTACHMENT_REPOSITORY, CUSTOMER_REPOSITORY, DEAL_REPOSITORY } from "@types";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { EmployeeVM } from '@view-models';

@Injectable()
export class SearchService {
  constructor(
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(ACTIVITY_REPOSITORY) protected readonly activityRepository: ActivityRepository,
    @Inject(ATTACHMENT_REPOSITORY) protected readonly attachmentRepository: AttachmentRepository,
    @Inject(CUSTOMER_REPOSITORY) protected readonly cusomterRepository: CustomerRepository,
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
  ) { }
  public readonly search = async (value: string, requester: EmployeeVM): Promise<any> => {
    const rs = [];
    let deals = await this.dealRepository.useHTTP().find({relations: ['assignee']});
    let attachments = await this.attachmentRepository.useHTTP().find({ relations: ['deal'] });
    let activitys = await this.activityRepository.useHTTP().find({ relations: ['deal'] });
    const canGetAllDeal = requester.roles.filter((e) => e.canGetAllDeal).length > 0;
    const canGetFeedbackDeal = requester.roles.filter((e) => e.canGetFeedbackDeal).length > 0;
    const canGetAssignDeal = requester.roles.filter((e) => e.canGetAssignDeal).length > 0;
    if (!canGetAllDeal) {
      if (!canGetFeedbackDeal && !canGetAssignDeal) {
        deals = [];
      } else if (canGetFeedbackDeal || canGetAssignDeal) {
        if (canGetFeedbackDeal) {
          deals = deals.filter((deal) => deal.status === 'won');
        }
        if (canGetAssignDeal) {
          deals = deals.filter((deal) => deal.assignee.id === requester.id);
        }
       
      }
    }
    attachments = attachments.filter((attachment) => deals.filter((d) => d.id === attachment.deal.id).length > 0);
    activitys = activitys.filter((activity) => deals.filter((d) => d.id === activity.deal.id).length > 0);
    rs.push({
      type: 'deal',
      data: deals.filter((e) => e.title.toLowerCase().includes(value.toLowerCase()))
    });
    rs.push({
      type: 'attachment',
      data: attachments.filter((e) => e.name.toLowerCase().includes(value.toLowerCase()))
    });
    rs.push({
      type: 'activity',
      data: activitys.filter((e) => e.name.toLowerCase().includes(value.toLowerCase()))
    });
    const customers = await this.cusomterRepository.useHTTP().find({ relations: ['groups'] });
    rs.push({
      type: 'lead',
      data: customers.filter((e) => e.fullname.toLowerCase().includes(value.toLowerCase()) && e.groups.filter((e) => e.id == '3').length > 0)
    });
    rs.push({
      type: 'customer',
      data: customers.filter((e) => e.fullname.toLowerCase().includes(value.toLowerCase()))
    });
    return rs;
  }
}