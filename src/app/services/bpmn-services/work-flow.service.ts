import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { WORK_FLOW_REPOSITORY } from 'src/app/constant';
import { WorkFlowCM, WorkFlowUM, WorkFlowVM } from 'src/app/dtos';
import { WorkFlowInstance } from 'src/app/models';
import { WorkFlowRepository } from 'src/app/repositories';

@Injectable()
export class WorkFlowService {
  constructor(
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    @Inject(WORK_FLOW_REPOSITORY) protected readonly workFlowRepository: WorkFlowRepository,
  ) {}

  public readonly findAll = async (): Promise<WorkFlowVM[]> => {
    return await this.workFlowRepository
      .findAll({}, [this.sequelize.getRepository(WorkFlowInstance)])
      .then(workFlows =>
        workFlows.map(
          workFlow =>
            new WorkFlowVM({
              Id: workFlow.Id,
              Name: workFlow.Name,
              Description: workFlow.Description,
              IsDelete: workFlow.IsDelete,
              CreatedAt: workFlow.CreatedAt,
              UpdatedAt: workFlow.UpdatedAt,
            }),
        ),
      )
      .catch(e => {
        throw new HttpException(
          'Error at [WorkFlowController] [findAll function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly findById = async (id: string): Promise<WorkFlowVM> => {
    return await this.workFlowRepository
      .findById({ Id: id }, [this.sequelize.getRepository(WorkFlowInstance)])
      .then(workFlow => {
        if (workFlow !== null) {
          return new WorkFlowVM({
            Id: workFlow.Id,
            Name: workFlow.Name,
            Description: workFlow.Description,
            IsDelete: workFlow.IsDelete,
            CreatedAt: workFlow.CreatedAt,
            UpdatedAt: workFlow.UpdatedAt,
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
          'Error at [WorkFlowController] [findByUsername function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly insert = async (body: WorkFlowCM): Promise<WorkFlowVM> => {
    return await this.workFlowRepository
      .insert({ ...(body as any) })
      .then(
        workFlow =>
          new WorkFlowVM({
            Id: workFlow.Id,
            Name: workFlow.Name,
            Description: workFlow.Description,
            IsDelete: workFlow.IsDelete,
            CreatedAt: workFlow.CreatedAt,
            UpdatedAt: workFlow.UpdatedAt,
          }),
      )
      .catch(e => {
        throw new HttpException(
          'Error at [WorkFlowController] [insert function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly update = async (body: WorkFlowUM): Promise<WorkFlowVM> => {
    return await this.findById(body.Id)
      .then(async () => {
        return await this.workFlowRepository
          .update(body as any, { Id: body.Id })
          .then(() => {
            throw new HttpException(
              `Update information of ${body.Id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
          .catch(e => {
            throw new HttpException(
              'Error at [WorkFlowController] [update function] with [message]: ' +
                e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      })
      .catch(e => {
        throw new HttpException(
          'Error at [WorkFlowController] [update function] with [message]: ' +
            e.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  };

  public readonly remove = async (id: string): Promise<WorkFlowVM> => {
    return await this.workFlowRepository
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
  };

  public readonly active = async (id: string): Promise<WorkFlowVM> => {
    return await this.workFlowRepository
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
  };

  public readonly deactive = async (id: string): Promise<WorkFlowVM> => {
    return await this.workFlowRepository
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
  };
}
