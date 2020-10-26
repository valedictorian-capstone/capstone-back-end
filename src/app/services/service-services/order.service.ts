import { InvalidException, NotFoundException } from '@exceptions';
import { Order } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '@repositories';
import { ORDER_REPOSITORY } from '@types';
import { OrderCM, OrderUM, OrderVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) protected readonly orderRepository: OrderRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<OrderVM[]> => {
    return await this.orderRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: [] })
      .then(async (models) => {
        return this.mapper.mapArray(models, OrderVM, Order)
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  };

  public readonly findById = async (id: string): Promise<OrderVM> => {
    return await this.orderRepository.useHTTP().findOne({ where: { id: id }, relations: [] })
      .then(async (model) => {
        if (model) {
          return this.mapper.map(model, OrderVM, Order);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly checkUnique = async (label: string, value: string): Promise<string> => {
    const query = { [label]: value };
    return this.orderRepository.useHTTP().findOne({ where: query })
      .then((model) =>{
        return model ? true : false;
      }).catch(err => err);
  }

  // public readonly insert = async (body: OrderCM): Promise<any> => {
  //   return await this.orderRepository.useHTTP().save(body).then(async (order) => {
  //     return await this.findById(order.id);
  //   }).catch(err => err);
  // };

  // public readonly update = async (body: OrderUM): Promise<OrderVM> => {
  //   return await this.orderRepository.useHTTP().findOne({ id: body.id })
  //     .then(async (model) => {
  //       if (!model) {
  //         throw new NotFoundException(
  //           `Can not find ${body.id}`,
  //         );
  //       }else{
  //         return await this.orderRepository.useHTTP().save(body).then(async (order) => {
  //           return await this.findById(order.id);
  //         }).catch(err => err);
  //       }
  //     });
  // };

  public readonly remove = async (id: string): Promise<OrderVM> => {
    return await this.orderRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.orderRepository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly active = async (id: string): Promise<OrderVM[]> => {
    return await this.orderRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.orderRepository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<OrderVM[]> => {
    return await this.orderRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.orderRepository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}
