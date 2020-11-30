import { InvalidException, NotFoundException } from '@exceptions';
import { Ticket } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerRepository, TicketRepository } from '@repositories';
import { CUSTOMER_REPOSITORY, TICKET_REPOSITORY } from '@types';
import { TicketCM, TicketUM, TicketVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';
import { verify } from 'jsonwebtoken';

@Injectable()
export class TicketService {
  constructor(
    @Inject(TICKET_REPOSITORY) protected readonly ticketRepository: TicketRepository,
    @Inject(CUSTOMER_REPOSITORY) protected readonly customerRepository: CustomerRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<TicketVM[]> => {
    return await this.ticketRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["customer"] })
      .then(async (models) => {
        return this.mapper.mapArray(models, TicketVM, Ticket)
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  };

  public readonly findById = async (id: string): Promise<TicketVM> => {
    return await this.ticketRepository.useHTTP().findOne({ where: { id: id }, relations: ["customer"] })
      .then(async (model) => {
        if (model) {
          return this.mapper.map(model, TicketVM, Ticket);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = async (body: TicketCM, token: string): Promise<TicketVM> => {
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    const customer = await this.customerRepository.useHTTP().findOne({ where: { id: Object.assign(decoded.valueOf()).customer.id }});
    return await this.ticketRepository.useHTTP().save({...body, status: 'waiting', customer}).then(async (model) => {
      return await this.findById(model.id);
    });
  };

  public readonly update = async (body: TicketUM, token: string): Promise<TicketVM> => {
    return await this.ticketRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        } else {
          return await this.ticketRepository.useHTTP().save(body as any).then(async (model) => {
            return await this.findById(model.id);
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
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly active = async (id: string): Promise<TicketVM> => {
    return await this.ticketRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.ticketRepository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then((model) => {
            return this.findById(model.id);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<TicketVM> => {
    return await this.ticketRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.ticketRepository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then((model) => {
            return this.findById(model.id);
          })
      });
  };
}
