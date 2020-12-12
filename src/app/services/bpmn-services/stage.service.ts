import { Stage } from "@models";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PipelineRepository, StageRepository } from "@repositories";
import { PIPELINE_REPOSITORY, SOCKET_SERVICE } from "@types";
import { StageCM, StageUM, StageVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { STAGE_REPOSITORY } from "src/app/types/bpmn-types/stage.type";
import { In } from "typeorm";
import { SocketService } from "../extra-services";

@Injectable()
export class StageService {

  constructor(
    @Inject(STAGE_REPOSITORY) protected readonly stageRepository: StageRepository,
    @Inject(PIPELINE_REPOSITORY) protected readonly pipelineRepository: PipelineRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }
  public readonly findAll = async (ids?: string[]): Promise<StageVM[]> => {
    return await this.stageRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: [] })
      .then((models) => {
        return this.mapper.mapArray(models, StageVM, Stage)
      });
  }
  public readonly findById = async (id: string): Promise<StageVM> => {
    return await this.stageRepository.useHTTP().findOne({ where: { id: id }, relations: ['deals', 'pipeline'] })
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
  public readonly findByPipeline = async (id: string): Promise<StageVM> => {

    return await this.stageRepository.useHTTP().findOne({ where: { pipeline: { id } }, relations: ['pipeline'] })
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
      .then(async (model) => {
        const rs = await this.findById(model.id);
        this.socketService.with('stages', rs, 'create');
        return rs;
      })
  }
  public readonly update = async (body: StageUM): Promise<StageVM> => {
    return await this.stageRepository.useHTTP()
      .save(body as any)
      .then(async (model) => {
        const rs = await this.findById(model.id);
        this.socketService.with('stages', rs, 'update');
        return rs;
      })
  }
  public readonly remove = async (id: string): Promise<any> => {
    return await this.stageRepository.useHTTP().findOne({ id: id }, { relations: ['deals'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.stageRepository.useHTTP()
          .remove(model)
          .then(async () => {
            const rs = this.mapper.map({...model, id} as Stage, StageVM, Stage);
            this.socketService.with('stages', rs, 'remove');
            return rs;
          })
      });
  }
}