import { Pipeline } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PipelineRepository } from "@repositories";
import { PipelineCM, PipelineUM, PipelineVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { PIPELINE_REPOSITORY } from "src/app/types/bpmn-types/Pipeline.type";
import { In } from "typeorm";

@Injectable()
export class PipelineService {

  constructor(
    @Inject(PIPELINE_REPOSITORY) protected readonly pipelineRepository: PipelineRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<PipelineVM[]> => {
    return await this.pipelineRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: [] })
      .then((models) => {
        return this.mapper.mapArray(models, PipelineVM, Pipeline)
      });
  }

  public readonly findById = async (id: string): Promise<PipelineVM> => {
    return await this.pipelineRepository.useHTTP().findOne({ where: { id: id }, relations: [] })
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

  public readonly checkUnique = async (label: string, value: string): Promise<boolean> => {
    const query = { [label]: value };
    return this.pipelineRepository.useHTTP().findOne({ where: query })
      .then((model) => {
        return model ? true : false;
      })
  }

  public readonly insert = async (body: PipelineCM): Promise<PipelineVM> => {
    return await this.pipelineRepository.useHTTP().save(body as any)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly update = async (body: PipelineUM): Promise<PipelineVM> => {
      return await this.pipelineRepository.useHTTP()
        .save(body as any)
        .then((model) => {
          return this.findById(model.id);
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