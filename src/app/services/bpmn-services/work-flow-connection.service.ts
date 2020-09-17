import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { WorkFlowConnectionRepository } from 'src/app/repositories';
import { WORK_FLOW_CONNECTION_REPOSITORY } from 'src/app/types';
import { WorkFlowConnectionCM, WorkFlowConnectionUM, WorkFlowConnectionVM } from 'src/app/view-models';
@Injectable()
export class WorkFlowConnectionService {
  constructor(
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    @Inject(WORK_FLOW_CONNECTION_REPOSITORY) protected readonly repository: WorkFlowConnectionRepository,
  ) {}

  public readonly findAll = async (): Promise<WorkFlowConnectionVM[]> => {
    return await this.repository.findAll({}, [])
      .then((models) => models.map((model) => new WorkFlowConnectionVM({...model.get()})))
      .catch((e) => {
        throw new HttpException(
          `Error at [WorkFlowConnectionController] [findAll function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly findById = async (id: string): Promise<WorkFlowConnectionVM> => {
    return await this.repository.findById({ Id: id }, [])
      .then((model) => {
        if (model !== null) {
          return new WorkFlowConnectionVM({...model.get()});
        }
        throw new HttpException(
          `Error at [WorkFlowConnectionController] [findById function] with [message]: Can not find ${id}`,
          HttpStatus.NOT_FOUND
        );
      })
      .catch((e) => {
        throw new HttpException(
          `Error at [WorkFlowConnectionController] [findById function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly insert = (body: WorkFlowConnectionCM): Promise<WorkFlowConnectionVM> => {
    return this.repository.insert(body as any)
      .then((model) => (new WorkFlowConnectionVM({...model.get()})))
      .catch((e) => {
        throw new HttpException(
          `Error at [WorkFlowConnectionController] [insert function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly update = async (body: WorkFlowConnectionUM): Promise<WorkFlowConnectionVM> => {
    return await this.findById(body.Id)
      .then(async () => {
        return await this.repository
          .update(body as any, { Id: body.Id })
          .then(() => (new WorkFlowConnectionVM({...body})))
          .catch(e => {
            throw new HttpException(
              'Error at [WorkFlowConnectionController] [update function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly remove = async (id: string): Promise<WorkFlowConnectionVM> => {
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
              'Error at [WorkFlowConnectionController] [remove function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly active = async (id: string): Promise<WorkFlowConnectionVM> => {
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
              'Error at [WorkFlowConnectionController] [active function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly deactive = async (id: string): Promise<WorkFlowConnectionVM> => {
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
              'Error at [WorkFlowConnectionController] [deactive function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };
}
