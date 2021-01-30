import { NotFoundException } from '@exceptions';
import { Role } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { RoleRepository } from '@repositories';
import { SocketService } from '@services';
import { ROLE_REPOSITORY, SOCKET_SERVICE } from '@types';
import { EmployeeVM, RoleCM, RoleUM, RoleVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { MoreThan } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY) protected readonly roleRepository: RoleRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }
  public readonly findAll = async (requester: EmployeeVM): Promise<RoleVM[]> => {
    const level = Math.min(...requester.roles.map((e) => e.level));
    return await this.roleRepository.useHTTP().find({ where: {level: MoreThan(level)}, relations: ['employees'] })
      .then(async (models) => {
        return this.mapper.mapArray(models, RoleVM, Role)
      });
  };
  public readonly findById = async (id: string): Promise<RoleVM> => {
    return await this.roleRepository.useHTTP().findOne({ where: { id: id } })
      .then(async (model) => {
        if (model) {
          return this.mapper.map(model, RoleVM, Role);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };
  public readonly checkUnique = async (label: string, value: string): Promise<boolean> => {
    const query = { [label]: value };
    return this.roleRepository.useHTTP().findOne({ where: query })
      .then((model) => {
        return model ? true : false;
      })
  };
  public readonly insert = async (body: RoleCM): Promise<RoleVM> => {
    return await this.roleRepository.useHTTP().save(body as any).then(async (role) => {
      const rs = await this.findById(role.id)
      this.socketService.with('roles', rs, 'create');
      return rs;
    });
  };
  public readonly update = async (body: RoleUM): Promise<RoleVM> => {
    return await this.roleRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        } else {
          return await this.roleRepository.useHTTP().save(body as any).then(async (role) => {
            const rs = await this.findById(role.id)
            this.socketService.with('roles', rs, 'update');
            return rs;
          });
        }
      });
  };
  public readonly remove = async (id: string): Promise<any> => {
    return await this.roleRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.roleRepository.useHTTP().remove(model)
          .then(async () => {
            const rs = this.mapper.map({ ...model, id } as Role, RoleVM, Role);
            this.socketService.with('roles', rs, 'remove');
            return rs;
          })
      });
  }
}
