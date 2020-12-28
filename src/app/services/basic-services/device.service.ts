import { NotFoundException } from '@exceptions';
import { Device } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { DeviceRepository } from '@repositories';
import { DEVICE_REPOSITORY, SOCKET_SERVICE } from '@types';
import { DeviceVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';
import { SocketService } from '../extra-services';

@Injectable()
export class DeviceService {
  constructor(
    @Inject(DEVICE_REPOSITORY) protected readonly repository: DeviceRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<DeviceVM[]> => {
    return await this.repository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ['employee'] })
      .then((models) => this.mapper.mapArray(models, DeviceVM, Device))
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
            const rs = this.mapper.map({...model, id} as Device, DeviceVM, Device);
            this.socketService.with('devices', rs, 'remove');
            return rs;
          })
      });
  };
}
