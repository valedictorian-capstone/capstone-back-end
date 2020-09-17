import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { RoleRepository } from 'src/app/repositories';
import { ROLE_REPOSITORY } from 'src/app/types';
import { RoleCM, RoleUM, RoleVM } from 'src/app/view-models';
@Injectable()
export class RoleService {
  constructor(
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    @Inject(ROLE_REPOSITORY) protected readonly repository: RoleRepository,
  ) { }

  public readonly findAll = async (): Promise<RoleVM[]> => {
    return await this.repository.findAll({}, [])
      .then((models) => models.map((model) => new RoleVM({...model.get()})))
      .catch((e) => {
        throw new HttpException(
          `Error at [RoleController] [findAll function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly findById = async (id: string): Promise<RoleVM> => {
    return await this.repository.findById({ Id: id }, [])
      .then((model) => {
        if (model !== null) {
          return new RoleVM({...model.get()});
        }
        throw new HttpException(
          `Error at [RoleController] [findById function] with [message]: Can not find ${id}`,
          HttpStatus.NOT_FOUND
        );
      })
      .catch((e) => {
        throw new HttpException(
          `Error at [RoleController] [findById function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly insert = (body: RoleCM): Promise<RoleVM> => {
    return this.repository.insert(body as any)
      .then((model) => (new RoleVM({...model.get()})))
      .catch((e) => {
        throw new HttpException(
          `Error at [RoleController] [insert function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly update = async (body: RoleUM): Promise<RoleVM> => {
    return await this.findById(body.Id)
      .then(async () => {
        return await this.repository
          .update(body as any, { Id: body.Id })
          .then(() => (new RoleVM({...body})))
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
    return await this.findById(id)
      .then(async () => {
        return await this.repository
          .remove({Id: id})
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
    return await this.findById(id)
      .then(async () => {
        return await this.repository
          .update({IsDelete: false} as any, { Id: id })
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
    return await this.findById(id)
      .then(async () => {
        return await this.repository
          .update({IsDelete: true} as any, { Id: id })
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
