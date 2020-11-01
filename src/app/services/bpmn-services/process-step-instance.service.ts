import { ProcessStepInstance } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProcessStepInstanceRepository } from "@repositories";
import { PROCESS_STEP_INSTANCE_REPOSITORY } from "@types";
import { ProcessStepInstanceCM, ProcessStepInstanceUM, ProcessStepInstanceVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from "typeorm";

@Injectable()
export class ProcessStepInstanceService {

  constructor(
    @Inject(PROCESS_STEP_INSTANCE_REPOSITORY) protected readonly processStepInstanceRepository: ProcessStepInstanceRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<ProcessStepInstanceVM[]> => {
    return await this.processStepInstanceRepository.useHTTP().find(ids ? { id: In(ids) } : {})
      .then((models) => this.mapper.mapArray(models, ProcessStepInstanceVM, ProcessStepInstance))
  }

  public readonly findById = async (id: string): Promise<ProcessStepInstanceVM> => {
    return await this.processStepInstanceRepository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, ProcessStepInstanceVM, ProcessStepInstance)
        }
      })
  }

  public readonly insert = async (body: ProcessStepInstanceCM): Promise<ProcessStepInstanceVM[]> => {
    return await this.processStepInstanceRepository.useHTTP().save(body as any)
      .then((model) => {
        const ids = [];
        ids.push(model.id);
        return this.findAll(ids);
      })
  }

  public readonly update = async (body: ProcessStepInstanceUM): Promise<ProcessStepInstanceVM[]> => {
    return await this.processStepInstanceRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.processStepInstanceRepository.useHTTP()
          .save(body)
          .then((model) => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.processStepInstanceRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.processStepInstanceRepository.useHTTP()
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