import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ROLE_REPOSITORY } from 'src/app/constant';
import { RoleCM, RoleUM, RoleVM } from 'src/app/dtos';
import { RoleRepository } from 'src/app/repositories';

@Injectable()
export class RoleService {
  constructor(
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    @Inject(ROLE_REPOSITORY) protected readonly roleRepository: RoleRepository,
  ) {}

  public readonly findAll = async (): Promise<RoleVM[]> => {
    return await this.roleRepository
      .findAll({}, [])
      .then(roles =>
        roles.map(
          role =>
            new RoleVM({
              Id: role.Id,
              Name: role.Name,
              IsDelete: role.IsDelete,
              CreatedAt: role.CreatedAt,
              UpdatedAt: role.UpdatedAt,
            }),
        ),
      )
      .catch(e => {
        throw new HttpException(
          'Error at [RoleController] [findAll function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly findById = async (id: string): Promise<RoleVM> => {
    return await this.roleRepository
      .findById({ Id: id }, [])
      .then(role => {
        if (role !== null) {
          return new RoleVM({
            Id: role.Id,
            Name: role.Name,
            IsDelete: role.IsDelete,
            CreatedAt: role.CreatedAt,
            UpdatedAt: role.UpdatedAt,
          });
        } else {
          throw new HttpException(
            'Can not find information of ' + id,
            HttpStatus.NOT_FOUND,
          );
        }
      })
      .catch(e => {
        throw new HttpException(
          'Error at [RoleController] [findByUsername function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly insert = async (body: RoleCM): Promise<RoleVM> => {
    return await this.roleRepository
      .insert({ ...(body as any) })
      .then(
        role =>
          new RoleVM({
            Id: role.Id,
            Name: role.Name,
            IsDelete: role.IsDelete,
            CreatedAt: role.CreatedAt,
            UpdatedAt: role.UpdatedAt,
          }),
      )
      .catch(e => {
        throw new HttpException(
          'Error at [RoleController] [insert function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly update = async (body: RoleUM): Promise<RoleVM> => {
    return await this.findById(body.Id)
      .then(async () => {
        return await this.roleRepository
          .update(body as any, { Id: body.Id })
          .then(() => {
            throw new HttpException(
              `Update information of ${body.Id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
          .catch(e => {
            throw new HttpException(
              'Error at [RoleController] [update function] with [message]: ' +
                e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      })
      .catch(e => {
        throw new HttpException(
          'Error at [RoleController] [update function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly remove = async (id: string): Promise<RoleVM> => {
    return await this.roleRepository
      .remove({ Id: id })
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
  };

  public readonly active = async (id: string): Promise<RoleVM> => {
    return await this.roleRepository
      .update({ IsDelete: false } as any, { Id: id })
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
  };

  public readonly deactive = async (id: string): Promise<RoleVM> => {
      return await this.roleRepository
      .update({ IsDelete: true } as any, { Id: id })
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
  }
}
