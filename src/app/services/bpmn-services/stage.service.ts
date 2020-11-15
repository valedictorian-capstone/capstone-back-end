import { Stage } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { StageRepository } from "@repositories";
import { StageCM, StageUM, StageVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { STAGE_REPOSITORY } from "src/app/types/bpmn-types/stage.type";
import { In } from "typeorm";

@Injectable()
export class StageService {

  constructor(
    @Inject(STAGE_REPOSITORY) protected readonly stageRepository: StageRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<StageVM[]> => {
    return await this.stageRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: [] })
      .then((models) => {
        return this.mapper.mapArray(models, StageVM, Stage)
      });
  }

  public readonly findById = async (id: string): Promise<StageVM> => {
    return await this.stageRepository.useHTTP().findOne({ where: { id: id }, relations: [] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, StageVM, Stage)
        }
      })
  }

  public readonly checkUnique = async (label: string, value: string): Promise<boolean> => {
    const query = { [label]: value };
    return this.stageRepository.useHTTP().findOne({ where: query })
      .then((model) => {
        return model ? true : false;
      })
  }

  public readonly insert = async (body: StageCM): Promise<StageVM> => {
    return await this.stageRepository.useHTTP().save(body as any)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly update = async (body: StageUM): Promise<StageVM> => {
      return await this.stageRepository.useHTTP()
        .save(body as any)
        .then((model) => {
          return this.findById(model.id);
        })
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.stageRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.stageRepository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  }
}