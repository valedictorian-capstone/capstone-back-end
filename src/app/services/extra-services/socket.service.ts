import { inject } from "@extras/functions";
import { AppGateway } from "@extras/gateways";
import { Inject, Injectable } from "@nestjs/common";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { Connection, In } from 'typeorm';
import { SOCKET_SERVICE } from '@types';

@Injectable()
export class SocketService {
  constructor(
    @Inject('DATABASE_CONNECTION') protected readonly connection: Connection,
    @InjectMapper() protected readonly mapper: AutoMapper,
    protected readonly gateway: AppGateway
  ) { }

  public static readonly inject = inject(SOCKET_SERVICE, SocketService);

  public readonly many = async <M, VM>(name: string, m: new (...args: any) => M, vm: new (...args: any) => VM, relations: string[], ids?: string[]) => {
    const data = this.mapper.mapArray<M, VM>(await this.connection.getRepository(m).find({ where: (ids ? { id: In(ids) } : {}), relations }), vm, m);
    this.gateway.server.emit(name, {
      type: 'view',
      data
    });
  }
  public readonly single = async <M, VM>(name: string, m: new (...args: any) => M, vm: new (...args: any) => VM, relations: string[], id: string, type: 'update' | 'create'| 'remove' | 'view' | 'list') => {
    const data = this.mapper.map<M, VM>(await this.connection.getRepository(m).findOne({ where: { id: id }, relations }), vm, m)
    this.gateway.server.emit(name, {
      type,
      data
    });
  }
  public readonly with = async<T>(name: string, data: T, type: 'update' | 'create'| 'remove' | 'view' | 'list') => {
    this.gateway.server.emit(name, {
      type,
      data
    });
  }
}