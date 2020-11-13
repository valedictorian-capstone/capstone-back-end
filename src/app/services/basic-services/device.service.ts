import { NotFoundException } from '@exceptions';
import { Device } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeviceRepository } from '@repositories';
import { DEVICE_REPOSITORY } from '@types';
import { DeviceCM, DeviceUM, DeviceVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class DeviceService {
  constructor(
    @Inject(DEVICE_REPOSITORY) protected readonly repository: DeviceRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<DeviceVM[]> => {
    return await this.repository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ['account'] })
      .then((models) => this.mapper.mapArray(models, DeviceVM, Device))
  };

  public readonly findById = async (id: string): Promise<DeviceVM> => {
    return await this.repository.useHTTP().findOne({ id: id }, { relations: ['account'] })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, DeviceVM, Device);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = (body: DeviceCM): Promise<DeviceVM> => {
    return this.repository.useHTTP().save(body)
      .then((model) => {
        return this.findById(model.id);
      })
  };

  public readonly update = async (body: DeviceUM): Promise<DeviceVM> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body)
          .then(() => {
            return this.findById(model.id);
          })
      });
  };

  public readonly remove = async (id: string): Promise<DeviceVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly active = async (id: string): Promise<DeviceVM[]> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<DeviceVM[]> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}
