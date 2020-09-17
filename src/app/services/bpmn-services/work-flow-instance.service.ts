import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { WorkFlowInstanceRepository } from 'src/app/repositories';
import { WORK_FLOW_INSTANCE_REPOSITORY } from 'src/app/types';
import { WorkFlowInstanceCM, WorkFlowInstanceUM, WorkFlowInstanceVM } from 'src/app/view-models';
@Injectable()
export class WorkFlowInstanceService {
  constructor(
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    @Inject(WORK_FLOW_INSTANCE_REPOSITORY) protected readonly repository: WorkFlowInstanceRepository,
  ) {}

  public readonly findAll = async (): Promise<WorkFlowInstanceVM[]> => {
    return await this.repository.findAll({}, [])
      .then((models) => models.map((model) => new WorkFlowInstanceVM({...model.get()})))
      .catch((e) => {
        throw new HttpException(
          `Error at [WorkFlowInstanceController] [findAll function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly findById = async (id: string): Promise<WorkFlowInstanceVM> => {
    return await this.repository.findById({ Id: id }, [])
      .then((model) => {
        if (model !== null) {
          return new WorkFlowInstanceVM({...model.get()});
        }
        throw new HttpException(
          `Error at [WorkFlowInstanceController] [findById function] with [message]: Can not find ${id}`,
          HttpStatus.NOT_FOUND
        );
      })
      .catch((e) => {
        throw new HttpException(
          `Error at [WorkFlowInstanceController] [findById function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly insert = (body: WorkFlowInstanceCM): Promise<WorkFlowInstanceVM> => {
    return this.repository.insert(body as any)
      .then((model) => (new WorkFlowInstanceVM({...model.get()})))
      .catch((e) => {
        throw new HttpException(
          `Error at [WorkFlowInstanceController] [insert function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly update = async (body: WorkFlowInstanceUM): Promise<WorkFlowInstanceVM> => {
    return await this.findById(body.Id)
      .then(async () => {
        return await this.repository
          .update(body as any, { Id: body.Id })
          .then(() => (new WorkFlowInstanceVM({...body})))
          .catch(e => {
            throw new HttpException(
              'Error at [WorkFlowInstanceController] [update function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly remove = async (id: string): Promise<WorkFlowInstanceVM> => {
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
              'Error at [WorkFlowInstanceController] [remove function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly active = async (id: string): Promise<WorkFlowInstanceVM> => {
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
              'Error at [WorkFlowInstanceController] [active function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly deactive = async (id: string): Promise<WorkFlowInstanceVM> => {
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
              'Error at [WorkFlowInstanceController] [deactive function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };
}
