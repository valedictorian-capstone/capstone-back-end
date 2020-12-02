import { Inject, Injectable } from "@nestjs/common";
import { ActivityRepository, AttachmentRepository, DealRepository, CustomerRepository } from "@repositories";
import { ACTIVITY_REPOSITORY, ATTACHMENT_REPOSITORY, DEAL_REPOSITORY, CUSTOMER_REPOSITORY } from "@types";
import { RoleVM } from "@view-models";
import { verify } from "jsonwebtoken";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

@Injectable()
export class SearchService {
  constructor(
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(ACTIVITY_REPOSITORY) protected readonly activityRepository: ActivityRepository,
    @Inject(ATTACHMENT_REPOSITORY) protected readonly attachmentRepository: AttachmentRepository,
    @Inject(CUSTOMER_REPOSITORY) protected readonly cusomterRepository: CustomerRepository,
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
  ) { }
  public readonly search = async (value: string, token: string): Promise<any> => {
    const rs = [];
      const deals = await this.dealRepository.useHTTP().find();
      const attachments = await this.attachmentRepository.useHTTP().find();
      rs.push({
        type: 'deal',
        data: deals.filter((e) => e.title.toLowerCase().includes(value.toLowerCase()))
      });
      rs.push({
        type: 'attachment',
        data: attachments.filter((e) => e.name.toLowerCase().includes(value.toLowerCase()))
      });
      const ativitys = await this.activityRepository.useHTTP().find();
      rs.push({
        type: 'activity',
        data: ativitys.filter((e) => e.name.toLowerCase().includes(value.toLowerCase()))
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