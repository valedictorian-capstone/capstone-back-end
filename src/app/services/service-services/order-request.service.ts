import { InvalidException, NotFoundException } from '@exceptions';
import { OrderRequest } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerRepository, OrderRequestRepository } from '@repositories';
import { CUSTOMER_SERVICE, ORDER_REQUEST_REPOSITORY, SERVICE_SERVICE } from '@types';
import { OrderRequestCM, OrderRequestUM, OrderRequestVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class OrderRequestService {
  constructor(
    @Inject(ORDER_REQUEST_REPOSITORY) protected readonly orderRequestRepository: OrderRequestRepository,
    @Inject(CUSTOMER_SERVICE) protected readonly customerRepository: CustomerRepository,
    @Inject(SERVICE_SERVICE) protected readonly serviceRepository: CustomerRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<OrderRequestVM[]> => {
    return await this.orderRequestRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["customer", "service"] })
      .then(async (models) => {
        return this.mapper.mapArray(models, OrderRequestVM, OrderRequest)
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  };

  public readonly findById = async (id: string): Promise<OrderRequestVM> => {
    return await this.orderRequestRepository.useHTTP().findOne({ where: { id: id }, relations: ["customer", "service"] })
      .then(async (model) => {
        if (model) {
          return this.mapper.map(model, OrderRequestVM, OrderRequest);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = async (body: OrderRequestCM): Promise<OrderRequestVM> => {
    return await this.orderRequestRepository.useHTTP().save(body).then(async (model) => {

      const customer = await this.customerRepository.useHTTP().findOne(body.customer.id);
      const service = await this.serviceRepository.useHTTP().findOne(body.customer.id);
      await this.orderRequestRepository.useHTTP().save({...model, 
        customer: customer,
        service: service
      })
      return await this.findById(model.id);
    });
  };

  public readonly update = async (body: OrderRequestUM): Promise<OrderRequestVM> => {
    return await this.orderRequestRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        } else {
          return await this.orderRequestRepository.useHTTP().save(body as any).then(async (model) => {
            return await this.findById(model.id);
          });
        }
      });
  };

  public readonly remove = async (id: string): Promise<OrderRequestVM> => {
    return await this.orderRequestRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.orderRequestRepository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly active = async (id: string): Promise<OrderRequestVM> => {
    return await this.orderRequestRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.orderRequestRepository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then((model) => {
            return this.findById(model.id);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<OrderRequestVM> => {
    return await this.orderRequestRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.orderRequestRepository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then((model) => {
            return this.findById(model.id);
          })
      });
  };
}
