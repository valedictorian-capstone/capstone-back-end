import { InvalidException, NotFoundException } from '@exceptions';
import { Role } from '@models';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RoleRepository } from '@repositories';
import { ROLE_REPOSITORY } from '@types';
import { RoleCM, RoleUM, RoleVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY) protected readonly roleRepository: RoleRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    private readonly jwtService: JwtService
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<RoleVM[]> => {
    return await this.roleRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ['accounts'] })
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
  }

  public readonly insert = async (body: RoleCM): Promise<RoleVM> => {
    return await this.roleRepository.useHTTP().save(body).then(async (role) => {
      return await this.findById(role.id);
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
          return await this.roleRepository.useHTTP().save(body).then(async (role) => {
            return await this.findById(role.id);
          });
        }
      });
  };

  public readonly remove = async (id: string): Promise<RoleVM> => {
    return await this.roleRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.roleRepository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly active = async (id: string): Promise<RoleVM[]> => {
    return await this.roleRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.roleRepository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<RoleVM[]> => {
    return await this.roleRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.roleRepository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}
