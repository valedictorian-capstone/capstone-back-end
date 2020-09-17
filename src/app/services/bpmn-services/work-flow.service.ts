import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { WorkFlowRepository } from 'src/app/repositories';
import { WORK_FLOW_REPOSITORY } from 'src/app/types';
import { WorkFlowCM, WorkFlowUM, WorkFlowVM } from 'src/app/view-models';
@Injectable()
export class WorkFlowService {
  constructor(
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    @Inject(WORK_FLOW_REPOSITORY) protected readonly repository: WorkFlowRepository,
  ) { }

  public readonly findAll = async (): Promise<WorkFlowVM[]> => {
    return await this.repository.findAll({}, [])
      .then((models) => models.map((model) => new WorkFlowVM({...model.get()})))
      .catch((e) => {
        throw new HttpException(
          `Error at [WorkFlowController] [findAll function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly findById = async (id: string): Promise<WorkFlowVM> => {
    return await this.repository.findById({ Id: id }, [])
      .then((model) => {
        if (model !== null) {
          return new WorkFlowVM({...model.get()});
        }
        throw new HttpException(
          `Error at [WorkFlowController] [findById function] with [message]: Can not find ${id}`,
          HttpStatus.NOT_FOUND
        );
      })
      .catch((e) => {
        throw new HttpException(
          `Error at [WorkFlowController] [findById function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly insert = (body: WorkFlowCM): Promise<WorkFlowVM> => {
    return this.repository.insert(body as any)
      .then((model) => (new WorkFlowVM({...model.get()})))
      .catch((e) => {
        throw new HttpException(
          `Error at [WorkFlowController] [insert function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly update = async (body: WorkFlowUM): Promise<WorkFlowVM> => {
    return await this.findById(body.Id)
      .then(async () => {
        return await this.repository
          .update(body as any, { Id: body.Id })
          .then(() => (new WorkFlowVM({...body})))
          .catch(e => {
            throw new HttpException(
              'Error at [WorkFlowController] [update function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly remove = async (id: string): Promise<WorkFlowVM> => {
    return await this.findById(id)
      .then(async () => {
        return await this.repository
          .remove({ Id: id })
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
          .catch(e => {
            throw new HttpException(
              'Error at [WorkFlowController] [remove function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly active = async (id: string): Promise<WorkFlowVM> => {
    return await this.findById(id)
      .then(async () => {
        return await this.repository
          .update({ IsDelete: false } as any, { Id: id })
          .then(() => {
            throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
          .catch(e => {
            throw new HttpException(
              'Error at [WorkFlowController] [active function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly deactive = async (id: string): Promise<WorkFlowVM> => {
    return await this.findById(id)
      .then(async () => {
        return await this.repository
          .update({ IsDelete: true } as any, { Id: id })
          .then(() => {
            throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
          .catch(e => {
            throw new HttpException(
              'Error at [WorkFlowController] [deactive function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };
}
