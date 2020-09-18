import { Role } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '@repositories';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { RoleCM, RoleUM, RoleVM } from 'src/app/view-models';
// import { Connection } from 'typeorm';
@Injectable()
export class RoleService {
  // protected readonly repository: RoleRepository;
  constructor(
    @InjectMapper() protected readonly mapper: AutoMapper,
    private roleRepository: RoleRepository
    // private readonly connection: Connection,
  ) {
    // this.repository = connection.getCustomRepository(RoleRepository)
  }

  public readonly findAll = async (): Promise<RoleVM[]> => {
    return await this.roleRepository
      .find()
      .then(models => this.mapper.mapArray(models, RoleVM, Role))
      .catch(e => {
        throw new HttpException(
          `Error at [RoleController] [findAll function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly findById = async (id: string): Promise<RoleVM> => {
    return await this.roleRepository
      .findOneCopy(id)
      .then(model => {
        if (model !== null) {
          return this.mapper.map(model, RoleVM, Role);
        }
        throw new HttpException(
          `Error at [RoleController] [findById function] with [message]: Can not find ${id}`,
          HttpStatus.NOT_FOUND,
        );
      })
      .catch(e => {
        throw new HttpException(
          `Error at [RoleController] [findById function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly insert = (body: RoleCM): Promise<RoleVM> => {
    return this.roleRepository
      .save(body)
      .then(model => this.mapper.map(model, RoleVM, Role))
      .catch(e => {
        throw new HttpException(
          `Error at [RoleController] [insert function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly update = async (body: RoleUM): Promise<RoleVM> => {
    return await this.roleRepository.findOne(body.Id).then(async () => {
      return await this.roleRepository
        .save(body)
        .then(() => this.mapper.map(body, RoleVM, RoleUM))
        .catch(e => {
          throw new HttpException(
            'Error at [RoleController] [update function] with [message]: ' +
              e.message,
            HttpStatus.BAD_REQUEST,
          );
        });
    });
  };

  public readonly remove = async (id: string): Promise<RoleVM> => {
    return await this.roleRepository.findOne(id).then(async model => {
      return await this.roleRepository
        .remove(model)
        .then(() => {
          throw new HttpException(
            `Remove information of ${id} successfully !!!`,
            HttpStatus.CREATED,
          );
        })
        .catch(e => {
          throw new HttpException(
            'Error at [RoleController] [remove function] with [message]: ' +
              e.message,
            HttpStatus.BAD_REQUEST,
          );
        });
    });
  };

  public readonly active = async (id: string): Promise<RoleVM> => {
    return await this.roleRepository.findOne(id).then(async model => {
      return await this.roleRepository
        .save({ ...model, IsDelete: false })
        .then(() => {
          throw new HttpException(
            `Update information of ${id} successfully !!!`,
            HttpStatus.CREATED,
          );
        })
        .catch(e => {
          throw new HttpException(
            'Error at [RoleController] [active function] with [message]: ' +
              e.message,
            HttpStatus.BAD_REQUEST,
          );
        });
    });
  };

  public readonly deactive = async (id: string): Promise<RoleVM> => {
    return await this.roleRepository.findOne(id).then(async model => {
      return await this.roleRepository
        .save({ ...model, IsDelete: true })
        .then(() => {
          throw new HttpException(
            `Update information of ${id} successfully !!!`,
            HttpStatus.CREATED,
          );
        })
        .catch(e => {
          throw new HttpException(
            'Error at [RoleController] [deactive function] with [message]: ' +
              e.message,
            HttpStatus.BAD_REQUEST,
          );
        });
    });
  };
}
