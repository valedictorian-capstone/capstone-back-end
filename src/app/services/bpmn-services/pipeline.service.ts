import { Pipeline } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PipelineRepository, StageRepository } from "@repositories";
import { PIPELINE_REPOSITORY, STAGE_REPOSITORY } from "@types";
import { PipelineCM, PipelineVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from "typeorm";

@Injectable()
export class PipelineService {

  constructor(
    @Inject(PIPELINE_REPOSITORY) protected readonly pipelineRepository: PipelineRepository,
    @Inject(STAGE_REPOSITORY) protected readonly stageRepository: StageRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<PipelineVM[]> => {
    return await this.pipelineRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: [ "stages" ] })
      .then((models) => {
        return this.mapper.mapArray(models, PipelineVM, Pipeline)
      });
  }

  public readonly findById = async (id: string): Promise<PipelineVM> => {
    return await this.pipelineRepository.useHTTP().findOne({ where: { id: id }, relations: [ "stages" ] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, PipelineVM, Pipeline)
        }
      })
  }


  public readonly save = async (body: PipelineCM): Promise<PipelineVM> => {
    return await this.pipelineRepository.useHTTP().save(body)
      .then(async (model) => {
        for (let index = 0; index < body.stages.length; index++) {
         await this.stageRepository.useHTTP().save({... body.stages[index], pipeline: model}) 
        }

        return await this.findById(model.id);
      })
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.pipelineRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.pipelineRepository.useHTTP()
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