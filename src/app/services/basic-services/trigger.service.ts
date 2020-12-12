import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CustomerRepository, EventRepository, GroupRepository, TriggerRepository } from '@repositories';
import { CUSTOMER_REPOSITORY, EVENT_REPOSITORY, GROUP_REPOSITORY, TRIGGER_REPOSITORY } from '@types';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { EmailService } from '../extra-services';

@Injectable()
export class TriggerService {
  constructor(
    @Inject(TRIGGER_REPOSITORY) protected readonly repository: TriggerRepository,
    @Inject(CUSTOMER_REPOSITORY) protected readonly customerRepository: CustomerRepository,
    @Inject(EVENT_REPOSITORY) protected readonly eventRepository: EventRepository,
    @Inject(GROUP_REPOSITORY) protected readonly groupRepository: GroupRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    protected emailService: EmailService,
  ) { }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const triggers = await this.repository.useHTTP().query('SELECT * FROM crm.trigger WHERE YEAR(time) = YEAR(NOW()) AND MONTH(time) = MONTH(NOW()) AND DAY(time) = DAY(NOW()) AND HOUR(time) = HOUR(NOW()) AND MINUTE(time) = MINUTE(NOW())');
    for (let index = 0; index < triggers.length; index++) {
      const trigger = triggers[index];
      const event = await this.eventRepository.useHTTP().findOne({ where: { id: trigger.eventId }, relations: ['groups'] });
      console.log(event);
      for (let j = 0; j < event.groups.length; j++) {
        let group = event.groups[j];
        group = await this.groupRepository.useHTTP().findOne({ where: { id: group.id }, relations: ['customers'] });
        console.log(group);
        await this.emailService.sendEventCustomer(group.customers, event);
      }
    }
  }
}
