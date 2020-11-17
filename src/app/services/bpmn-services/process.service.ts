import { Process } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProcessRepository, StageRepository } from "@repositories";
import { PROCESS_REPOSITORY, STAGE_REPOSITORY } from "@types";
import { ProcessCM, ProcessVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from "typeorm";

@Injectable()
export class ProcessService {

  constructor(
    @Inject(PROCESS_REPOSITORY) protected readonly processRepository: ProcessRepository,
    @Inject(STAGE_REPOSITORY) protected readonly stageRepository: StageRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<ProcessVM[]> => {
    return await this.processRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: [ "stages" ] })
      .then((models) => {
        return this.mapper.mapArray(models, ProcessVM, Process)
      });
  }

  public readonly findById = async (id: string): Promise<ProcessVM> => {
    return await this.processRepository.useHTTP().findOne({ where: { id: id }, relations: [ "stages" ] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, ProcessVM, Process)
        }
      })
  }


  public readonly save = async (body: ProcessCM): Promise<ProcessVM> => {
    return await this.processRepository.useHTTP().save(body)
      .then(async (model) => {
        for (let index = 0; index < body.stages.length; index++) {
         await this.stageRepository.useHTTP().save({... body.stages[index], process: model}) 
        }

        return await this.findById(model.id);
      })
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.processRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.processRepository.useHTTP()
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