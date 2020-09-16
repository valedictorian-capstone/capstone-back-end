import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { WORK_FLOW_CONNECTION_REPOSITORY } from 'src/app/constant';
import {
  WorkFlowConnectionCM,
  WorkFlowConnectionUM,
  WorkFlowConnectionVM,
} from 'src/app/dtos';
import { WorkFlowConnectionRepository } from 'src/app/repositories';

@Injectable()
export class WorkFlowConnectionService {
  constructor(
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    @Inject(WORK_FLOW_CONNECTION_REPOSITORY) protected readonly workFlowConnectionRepository: WorkFlowConnectionRepository,
  ) {}

  public readonly findAll = async (): Promise<WorkFlowConnectionVM[]> => {
    return await this.workFlowConnectionRepository
      .findAll({}, [])
      .then(workFlowConnections =>
        workFlowConnections.map(
          workFlowConnection =>
            new WorkFlowConnectionVM({
              Id: workFlowConnection.Id,
              Type: workFlowConnection.Type,
              Description: workFlowConnection.Description,
              FromWorkFlowInstanceId: workFlowConnection.FromWorkFlowInstanceId,
              ToWorkFlowInstanceId: workFlowConnection.ToWorkFlowInstanceId,
              IsDelete: workFlowConnection.IsDelete,
              CreatedAt: workFlowConnection.CreatedAt,
              UpdatedAt: workFlowConnection.UpdatedAt,
            }),
        ),
      )
      .catch(e => {
        throw new HttpException(
          'Error at [WorkFlowConnectionController] [findAll function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly findById = async (
    id: string,
  ): Promise<WorkFlowConnectionVM> => {
    return await this.workFlowConnectionRepository
      .findById({ Id: id }, [])
      .then(workFlowConnection => {
        if (workFlowConnection !== null) {
          return new WorkFlowConnectionVM({
            Id: workFlowConnection.Id,
            Type: workFlowConnection.Type,
            Description: workFlowConnection.Description,
            FromWorkFlowInstanceId: workFlowConnection.FromWorkFlowInstanceId,
            ToWorkFlowInstanceId: workFlowConnection.ToWorkFlowInstanceId,
            IsDelete: workFlowConnection.IsDelete,
            CreatedAt: workFlowConnection.CreatedAt,
            UpdatedAt: workFlowConnection.UpdatedAt,
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
          'Error at [WorkFlowConnectionController] [findByUsername function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly insert = async (
    body: WorkFlowConnectionCM,
  ): Promise<WorkFlowConnectionVM> => {
    return await this.workFlowConnectionRepository
      .insert({ ...(body as any) })
      .then(
        workFlowConnection =>
          new WorkFlowConnectionVM({
            Id: workFlowConnection.Id,
            Type: workFlowConnection.Type,
            Description: workFlowConnection.Description,
            FromWorkFlowInstanceId: workFlowConnection.FromWorkFlowInstanceId,
            ToWorkFlowInstanceId: workFlowConnection.ToWorkFlowInstanceId,
            IsDelete: workFlowConnection.IsDelete,
            CreatedAt: workFlowConnection.CreatedAt,
            UpdatedAt: workFlowConnection.UpdatedAt,
          }),
      )
      .catch(e => {
        throw new HttpException(
          'Error at [WorkFlowConnectionController] [insert function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly update = async (
    body: WorkFlowConnectionUM,
  ): Promise<WorkFlowConnectionVM> => {
    return await this.workFlowConnectionRepository
      .findById({ Id: body.Id }, [])
      .then(async () => {
        return await this.workFlowConnectionRepository
          .update(body as any, { Id: body.Id })
          .then(() => {
            throw new HttpException(
              `Update information of ${body.Id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
          .catch(e => {
            throw new HttpException(
              'Error at [WorkFlowConnectionController] [update function] with [message]: ' +
                e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      })
      .catch(e => {
        throw new HttpException(
          'Error at [WorkFlowConnectionController] [update function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly remove = async (
    id: string,
  ): Promise<WorkFlowConnectionVM> => {
    return await this.workFlowConnectionRepository
      .remove({ Id: id })
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
  };

  public readonly active = async (
    id: string,
  ): Promise<WorkFlowConnectionVM> => {
    return await this.workFlowConnectionRepository
      .update({ IsDelete: false } as any, { Id: id })
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
  };

  public readonly deactive = async (
    id: string,
  ): Promise<WorkFlowConnectionVM> => {
    return await this.workFlowConnectionRepository
      .update({ IsDelete: true } as any, { Id: id })
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
  };
}
