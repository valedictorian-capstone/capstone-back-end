import { InvalidException, NotFoundException } from '@exceptions';
import { OrderRequest } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OrderRequestRepository } from '@repositories';
import { ORDER_REQUEST_REPOSITORY } from '@types';
import { OrderRequestCM, OrderRequestUM, OrderRequestVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class OrderRequestOrderRequest {
  constructor(
    @Inject(ORDER_REQUEST_REPOSITORY) protected readonly orderRequestRepository: OrderRequestRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<OrderRequestVM[]> => {
    return await this.orderRequestRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: [] })
      .then(async (models) => {
        return this.mapper.mapArray(models, OrderRequestVM, OrderRequest)
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  };

  public readonly findById = async (id: string): Promise<OrderRequestVM> => {
    return await this.orderRequestRepository.useHTTP().findOne({ where: { id: id }, relations: [] })
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
    return await this.orderRequestRepository.useHTTP().save(body as any).then(async (model) => {
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
        }else{
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
