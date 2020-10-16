import { Role } from '@models';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '@repositories';
import { ROLE_REPOSITORY } from '@types';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { RoleCM, RoleUM, RoleVM } from 'src/app/view-models';
import { In } from 'typeorm';
@Injectable()
export class RoleService {

  constructor(
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(ROLE_REPOSITORY) protected readonly repository: RoleRepository
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<RoleVM[]> => {
    return await this.repository.useHTTP().find(ids ? { id: In(ids) } : {})
      .then((models) => this.mapper.mapArray(models, RoleVM, Role))
  };

  public readonly findById = async (id: string): Promise<RoleVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model !== null) {
          return this.mapper.map(model, RoleVM, Role);
        }
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
      })
  };

  public readonly insert = (body: RoleCM): Promise<RoleVM> => {
    return this.repository.useHTTP().insert(body)
      .then((model) => {
        return this.findById(model.generatedMaps[0].id);
      })
      .catch(err => err);
  };

  public readonly update = async (body: RoleUM): Promise<RoleVM> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body)
          .then((model) => {
            return this.findById(model.id);
          })
          .catch()
      });
  };

  public readonly remove = async (id: string): Promise<RoleVM> => {
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

  public readonly active = async (id: string): Promise<RoleVM[]> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then((model) => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<RoleVM[]> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then((model) => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}
