import { Pipeline } from "@models";
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PipelineRepository, StageRepository } from "@repositories";
import { PIPELINE_REPOSITORY, SOCKET_SERVICE, STAGE_REPOSITORY } from "@types";
import { PipelineCM, PipelineUM, PipelineVM } from '@view-models';
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from "typeorm";
import { SocketService } from "../extra-services";

@Injectable()
export class PipelineService {

  constructor(
    @Inject(PIPELINE_REPOSITORY) protected readonly pipelineRepository: PipelineRepository,
    @Inject(STAGE_REPOSITORY) protected readonly stageRepository: StageRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<PipelineVM[]> => {
    return await this.pipelineRepository.useHTTP().find({
      where: ids ? { id: In(ids) } : {}, relations: ['stages']
    })
      .then((models) => {
        return this.mapper.mapArray(models.map((model) => ({
          ...model,
          stages: model.stages.sort((a, b) => a.position - b.position)
        })), PipelineVM, Pipeline)
      });
  }
  public readonly findById = async (id: string): Promise<PipelineVM> => {
    return await this.pipelineRepository.useHTTP().findOne({ where: { id: id }, relations: ["stages", "stages.deals"] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          model.stages = model.stages.sort((a, b) => a.position - b.position);
          return this.mapper.map(model, PipelineVM, Pipeline)
        }
      })
  }
  public readonly save = async (body: PipelineCM | PipelineUM): Promise<PipelineVM> => {
    return await this.pipelineRepository.useHTTP().save(body)
      .then(async (model) => {
        await this.stageRepository.useHTTP().save(body.stages.map((stage) => ({ ...stage, pipeline: model })));
        const rs = await this.findById(model.id);
        this.socketService.with('pipelines', rs, (body as PipelineUM).id ? 'update' : 'create');
        return rs;
      })
  }
  public readonly remove = async (id: string): Promise<any> => {
    return await this.pipelineRepository.useHTTP().findOne({ id: id }, { relations: ['stages'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await
          (
            model.stages.length === 0
              ? this.pipelineRepository.useHTTP().remove(model)
              : this.pipelineRepository.useHTTP().save({ id, isDelete: true })
          )
            .then(async () => {
              if (model.stages.length === 0) {
                const rs = this.mapper.map({...model, id} as Pipeline, PipelineVM, Pipeline);
                this.socketService.with('pipelines', rs, 'remove');
                return rs;
              } else {
                const rs = await this.findById(model.id);
                this.socketService.with('pipelines', rs, 'update');
                return rs;
              }
            })
      });
  }
  public readonly restore = async (id: string): Promise<any> => {
    return await this.pipelineRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.pipelineRepository.useHTTP()
          .save({ id, isDelete: false })
          .then(async () => {
            const rs = await this.findById(id);
            this.socketService.with('pipelines', rs, 'update');
            return rs;
          })
      });
  }
}