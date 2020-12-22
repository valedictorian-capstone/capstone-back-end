import { InvalidException, NotFoundException } from '@exceptions';
import { Notification, Ticket } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository, CustomerRepository, NotificationRepository, TicketRepository } from '@repositories';
import { FirebaseService, SocketService } from '@services';
import { ACCOUNT_REPOSITORY, CUSTOMER_REPOSITORY, FIREBASE_SERVICE, NOTIFICATION_REPOSITORY, SOCKET_SERVICE, TICKET_REPOSITORY } from '@types';
import { AccountVM, CustomerVM, NotificationVM, TicketCM, TicketUM, TicketVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class TicketService {
  constructor(
    @Inject(TICKET_REPOSITORY) protected readonly ticketRepository: TicketRepository,
    @Inject(CUSTOMER_REPOSITORY) protected readonly customerRepository: CustomerRepository,
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(NOTIFICATION_REPOSITORY) protected readonly notificationRepository: NotificationRepository,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }

  public readonly findAll = async (requester: AccountVM): Promise<TicketVM[]> => {
    return await this.ticketRepository.useHTTP().find({ relations: ["customer", "assignee", "feedbackAssignee"] })
      .then(async (models) => {
        const canGetTicketDeal = requester.roles.filter((e) => e.canGetTicketDeal).length > 0;
        const canGetTicketSupport = requester.roles.filter((e) => e.canGetTicketSupport).length > 0;
        const canGetFeedbackTicket = requester.roles.filter((e) => e.canGetFeedbackTicket).length > 0;
        if (canGetTicketDeal && canGetTicketSupport) {
        } else if (!canGetTicketDeal && !canGetTicketSupport) {
          if (canGetFeedbackTicket) {
            models = models.filter((e) => e.status === 'resolve' && (e.feedbackAssignee ? (e.feedbackAssignee?.id === requester.id) : true));
          } else {
            models = [];
          }
        } else {
          if (canGetTicketDeal) {
            if (canGetFeedbackTicket) {
              models = models.filter((e) => (e.status === 'resolve' && (e.feedbackAssignee ? (e.feedbackAssignee?.id === requester.id) : true) || (e.type === 'deal' && (e.assignee ? (e.assignee?.id === requester.id) : true))));
            } else {
              models = models.filter((e) => e.type === 'deal' && (e.assignee ? (e.assignee?.id === requester.id) : true));
            }
          }
          if (canGetTicketSupport) {
            if (canGetFeedbackTicket) {
              models = models.filter((e) => (e.status === 'resolve' && (e.feedbackAssignee ? (e.feedbackAssignee?.id === requester.id) : true) || (e.type === 'other' && (e.assignee ? (e.assignee?.id === requester.id) : true))));
            } else {
              models = models.filter((e) => e.type === 'other' && (e.assignee ? (e.assignee?.id === requester.id) : true));
            }
          }

        }
        return this.mapper.mapArray(models, TicketVM, Ticket);
      }).catch((err) => {
        throw new InvalidException(err);
      });
  };
  public readonly findByCustomerId = async (id: string): Promise<TicketVM[]> => {
    return await this.ticketRepository.useHTTP().find({ relations: ["customer", "assignee", "feedbackAssignee"], where: { customer: { id } } })
      .then(async (models) => {
        return this.mapper.mapArray(models, TicketVM, Ticket);
      });
  };
  public readonly findById = async (id: string): Promise<TicketVM> => {
    return await this.ticketRepository.useHTTP().findOne({ where: { id: id }, relations: ["customer", "assignee", "feedbackAssignee"] })
      .then(async (model) => {
        if (model) {
          return this.mapper.map(model, TicketVM, Ticket);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };
  public readonly insert = async (body: TicketCM, requester: CustomerVM): Promise<TicketVM> => {
    return await this.ticketRepository.useHTTP().save({ ...body, status: 'waiting', customer: { id: requester.id } } as any).then(async (model) => {
      const accounts = (await this.accountRepository.useHTTP().find({ relations: ['devices', 'roles'] }));
      for (const account of accounts) {
        const canGetTicketDeal = account.roles.filter((e) => e.canGetTicketDeal).length > 0;
        const canGetTicketSupport = account.roles.filter((e) => e.canGetTicketSupport).length > 0;
        if ((model.type === 'deal' && canGetTicketDeal) || (model.type === 'other' && canGetTicketSupport)) {
          await this.notificationRepository.useHTTP().save({
            body: `New ticket need to resolve`,
            title: "Have a new ticket",
            type: 'create',
            name: 'ticket',
            data: (await this.findById(model.id)),
            icon: 'https://storage.googleapis.com/m-crm-company.appspot.com/logo-black.png',
            account: { id: account.id }
          }).then(async (notification) => {
            this.socketService.with('notifications', this.mapper.map(await this.notificationRepository.useHTTP().findOne({ id: notification.id }, { relations: ['account'] }), NotificationVM, Notification), 'create');
          })
          if (account.devices.length > 0) {
            await this.firebaseService.useSendToDevice(account.devices.map((e) => e.id), {
              notification: {
                body: `New ticket need to resolve`,
                title: "Have a new ticket",
                icon: 'https://storage.googleapis.com/m-crm-company.appspot.com/logo-black.png'
              },
              // data: (await this.findById(model.id)) as any
            });
          }
        }
      }
      const rs = await this.findById(model.id)
      this.socketService.with('tickets', rs, 'create');
      return rs;
    });
  };

  public readonly unAuthorizedInsert = async (body: TicketCM): Promise<TicketVM> => {
    return await this.ticketRepository.useHTTP().save({ ...body, status: 'waiting' }).then(async (model) => {
      const accounts = (await this.accountRepository.useHTTP().find({ relations: ['devices', 'roles'] }));
      for (const account of accounts) {
        const canGetTicketDeal = account.roles.filter((e) => e.canGetTicketDeal).length > 0;
        const canGetTicketSupport = account.roles.filter((e) => e.canGetTicketSupport).length > 0;
        if ((model.type === 'deal' && canGetTicketDeal) || (model.type === 'other' && canGetTicketSupport)) {
          await this.notificationRepository.useHTTP().save({
            body: `New ticket need to resolve`,
            title: "Have a new ticket",
            type: 'create',
            name: 'ticket',
            data: (await this.findById(model.id)),
            icon: 'https://storage.googleapis.com/m-crm-company.appspot.com/logo-black.png',
            account: { id: account.id }
          }).then(async (notification) => {
            this.socketService.with('notifications', this.mapper.map(await this.notificationRepository.useHTTP().findOne({ id: notification.id }, { relations: ['account'] }), NotificationVM, Notification), 'create');
          })
          if (account.devices.length > 0) {
            await this.firebaseService.useSendToDevice(account.devices.map((e) => e.id), {
              notification: {
                body: `New ticket need to resolve`,
                title: "Have a new ticket",
                icon: 'https://storage.googleapis.com/m-crm-company.appspot.com/logo-black.png'
              },
              // data: (await this.findById(model.id)) as any
            });
          }
        }
      }
      const rs = await this.findById(model.id)
      this.socketService.with('tickets', rs, 'create');
      return rs;
    });
  };

  public readonly botInsert = async (body: TicketCM): Promise<TicketVM> => {
    const customer = await this.customerRepository.useHTTP().findOne({ where: { id: body.customer.id } });
    return await this.ticketRepository.useHTTP().save({ ...body, status: 'waiting', customer }).then(async (model) => {
      const accounts = (await this.accountRepository.useHTTP().find({ relations: ['devices', 'roles'] }));
      for (const account of accounts) {
        const canGetTicketDeal = account.roles.filter((e) => e.canGetTicketDeal).length > 0;
        const canGetTicketSupport = account.roles.filter((e) => e.canGetTicketSupport).length > 0;
        if ((model.type === 'deal' && canGetTicketDeal) || (model.type === 'other' && canGetTicketSupport)) {
          await this.notificationRepository.useHTTP().save({
            body: `New ticket need to resolve`,
            title: "Have a new ticket",
            type: 'create',
            name: 'ticket',
            data: (await this.findById(model.id)),
            icon: 'https://storage.googleapis.com/m-crm-company.appspot.com/logo-black.png',
            account: { id: account.id }
          }).then(async (notification) => {
            this.socketService.with('notifications', this.mapper.map(await this.notificationRepository.useHTTP().findOne({ id: notification.id }, { relations: ['account'] }), NotificationVM, Notification), 'create');
          })
          if (account.devices.length > 0) {
            await this.firebaseService.useSendToDevice(account.devices.map((e) => e.id), {
              notification: {
                body: `New ticket need to resolve`,
                title: "Have a new ticket",
                icon: 'https://storage.googleapis.com/m-crm-company.appspot.com/logo-black.png'
              },
              // data: (await this.findById(model.id)) as any
            });
          }
        }
      }
      const rs = await this.findById(model.id)
      this.socketService.with('tickets', rs, 'create');
      return rs;
    });
  };
  public readonly update = async (body: TicketUM): Promise<TicketVM> => {
    return await this.ticketRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        } else {
          return await this.ticketRepository.useHTTP().save(body).then(async (model) => {
            const rs = await this.findById(model.id)
            this.socketService.with('tickets', rs, 'update');
            return rs;
          });
        }
      });
  };
  public readonly remove = async (id: string): Promise<TicketVM> => {
    return await this.ticketRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.ticketRepository.useHTTP()
          .remove(model)
          .then(async () => {
            const rs = this.mapper.map({ ...model, id } as Ticket, TicketVM, Ticket);
            this.socketService.with('tickets', rs, 'remove');
            return rs;
          })
      });
  };
}
