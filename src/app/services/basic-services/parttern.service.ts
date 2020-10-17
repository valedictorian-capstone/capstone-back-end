import { Pattern } from '@models';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PatternRepository } from '@repositories';
import { PATTERN_REPOSITORY } from '@types';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { PatternCM, PatternUM, PatternVM } from 'src/app/view-models';
import { In } from 'typeorm';
@Injectable()
export class PatternService {

  constructor(
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(PATTERN_REPOSITORY) protected readonly repository: PatternRepository
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<PatternVM[]> => {
    return await this.repository.useHTTP().find(ids ? { id: In(ids) } : {})
      .then((models) => this.mapper.mapArray(models, PatternVM, Pattern))
  };

  public readonly findById = async (id: string): Promise<PatternVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model !== null) {
          return this.mapper.map(model, PatternVM, Pattern);
        }
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
      })
  };

  public readonly insert = (body: PatternCM): Promise<PatternVM> => {
    return this.repository.useHTTP().save(body)
      .then((model) => {
        return this.findById(model.id);
      })
      .catch(err => err);
  };

  public readonly update = async (body: PatternUM): Promise<PatternVM> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body)
          .then((model) => {
            return this.findById(model.id);
          })
          .catch()
      });
  };

  public readonly remove = async (id: string): Promise<PatternVM> => {
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

  public readonly active = async (id: string): Promise<PatternVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then((model) => {
            return this.findById(model.id);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<PatternVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then((model) => {
            return this.findById(model.id);
          })
      });
  };
}
