import { NotFoundException } from '@exceptions';
import { Comment } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountRepository, CommentRepository, ProcessStepInstanceRepository } from '@repositories';
import { ACCOUNT_REPOSITORY, COMMENT_REPOSITORY, PROCESS_STEP_REPOSITORY } from '@types';
import { CommentCM, CommentUM, CommentVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY) protected readonly repository: CommentRepository,
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @Inject(PROCESS_STEP_REPOSITORY) protected readonly processStepInstanceRepository: ProcessStepInstanceRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<CommentVM[]> => {
    return await this.repository.useHTTP().find(ids ? { id: In(ids) } : {})
      .then((models) => this.mapper.mapArray(models, CommentVM, Comment))
  };

  public readonly findById = async (id: string): Promise<CommentVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, CommentVM, Comment);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = (body: CommentCM): Promise<CommentVM> => {
    const account = this.accountRepository.useHTTP().findOne(body.account.account.id);

    const processStepInstance = this.processStepInstanceRepository.useHTTP().findOne(body.processStepInstance.processStepInstance.id);

    return this.repository.useHTTP().save(body as any)
      .then((model) => {
        model.account = account;
        model.processStepInstance = processStepInstance;
        console.log(account);
        console.log(processStepInstance);
        this.repository.useHTTP().save(model).then((model) => {
          return this.findById(model.id);
        }).catch(err => err)
      }).catch(err => err);
  };

  public readonly update = async (body: CommentUM): Promise<CommentVM> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body)
          .then(() => {
            return this.findById(model.id);
          })
      });
  };

  public readonly remove = async (id: string): Promise<CommentVM> => {
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

  public readonly active = async (id: string): Promise<CommentVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then(() => {
            return this.findById(model.id);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<CommentVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then(() => {
            return this.findById(model.id);
          })
      });
  };
}
