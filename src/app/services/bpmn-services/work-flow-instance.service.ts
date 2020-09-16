import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { WORK_FLOW_INSTANCE_REPOSITORY } from 'src/app/constant';
import {
  WorkFlowInstanceCM,
  WorkFlowInstanceUM,
  WorkFlowInstanceVM,
} from 'src/app/dtos';
import { WorkFlowConnection } from 'src/app/models';
import { WorkFlowInstanceRepository } from 'src/app/repositories';
@Injectable()
export class WorkFlowInstanceService {
  constructor(
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    @Inject(WORK_FLOW_INSTANCE_REPOSITORY) protected readonly workflowInstanceRepository: WorkFlowInstanceRepository,
  ) {}

  public readonly findAll = async (): Promise<WorkFlowInstanceVM[]> => {
    return await this.workflowInstanceRepository
      .findAll({}, [this.sequelize.getRepository(WorkFlowConnection)])
      .then(workFlowInstances =>
        workFlowInstances.map(
          workFlowInstance =>
            new WorkFlowInstanceVM({
              Id: workFlowInstance.Id,
              Name: workFlowInstance.Name,
              WorkFlowId: workFlowInstance.WorkFlowId,
              Description: workFlowInstance.Description,
              IsDelete: workFlowInstance.IsDelete,
              CreatedAt: workFlowInstance.CreatedAt,
              UpdatedAt: workFlowInstance.UpdatedAt,
            }),
        ),
      )
      .catch(e => {
        throw new HttpException(
          'Error at [WorkFlowInstanceController] [findAll function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly findById = async (
    id: string,
  ): Promise<WorkFlowInstanceVM> => {
    return await this.workflowInstanceRepository
      .findById({ Id: id }, [this.sequelize.getRepository(WorkFlowConnection)])
      .then(workFlowInstance => {
        if (workFlowInstance !== null) {
          return new WorkFlowInstanceVM({
            Id: workFlowInstance.Id,
            Name: workFlowInstance.Name,
            Description: workFlowInstance.Description,
            WorkFlowId: workFlowInstance.WorkFlowId,
            IsDelete: workFlowInstance.IsDelete,
            CreatedAt: workFlowInstance.CreatedAt,
            UpdatedAt: workFlowInstance.UpdatedAt,
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
          'Error at [WorkFlowInstanceController] [findByUsername function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly insert = async (
    body: WorkFlowInstanceCM,
  ): Promise<WorkFlowInstanceVM> => {
    return await this.workflowInstanceRepository
      .insert({ ...(body as any) })
      .then(
        workFlowInstance =>
          new WorkFlowInstanceVM({
            Id: workFlowInstance.Id,
            Name: workFlowInstance.Name,
            Description: workFlowInstance.Description,
            WorkFlowId: workFlowInstance.WorkFlowId,
            IsDelete: workFlowInstance.IsDelete,
            CreatedAt: workFlowInstance.CreatedAt,
            UpdatedAt: workFlowInstance.UpdatedAt,
          }),
      )
      .catch(e => {
        throw new HttpException(
          'Error at [WorkFlowInstanceController] [insert function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly update = async (
    body: WorkFlowInstanceUM,
  ): Promise<WorkFlowInstanceVM> => {
    return await this.findById(body.Id)
      .then(async () => {
        return await this.workflowInstanceRepository
          .update(body as any, { Id: body.Id })
          .then(() => {
            throw new HttpException(
              `Update information of ${body.Id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
          .catch(e => {
            throw new HttpException(
              'Error at [WorkFlowInstanceController] [update function] with [message]: ' +
                e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      })
      .catch(e => {
        throw new HttpException(
          'Error at [WorkFlowInstanceController] [update function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly remove = async (id: string): Promise<WorkFlowInstanceVM> => {
    return await this.workflowInstanceRepository
      .remove({ Id: id })
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
  };

  public readonly active = async (id: string): Promise<WorkFlowInstanceVM> => {
    return await this.workflowInstanceRepository
      .update({ IsDelete: false } as any, { Id: id })
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
  };

  public readonly deActivate = async (
    id: string,
  ): Promise<WorkFlowInstanceVM> => {
    return await this.workflowInstanceRepository
      .update({ IsDelete: true } as any, { Id: id })
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
  };
}
