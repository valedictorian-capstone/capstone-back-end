import { ProcessStep } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProcessStepRepository } from "@repositories";
import { ProcessStepCM, ProcessStepUM, ProcessStepVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { PROCESS_STEP_REPOSITORY } from "src/app/types/bpmn-types/process-step.type";
import { In } from "typeorm";

@Injectable()
export class ProcessStepService {

  constructor(
    @Inject(PROCESS_STEP_REPOSITORY) protected readonly processConnectionRepository: ProcessStepRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<any[]> => {
    return await this.processConnectionRepository.useHTTP().find(ids ? { id: In(ids) } : {})
      .then((models) => models)
  }

  public readonly findById = async (id: string): Promise<ProcessStepVM> => {
    return await this.processConnectionRepository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, ProcessStepVM, ProcessStep)
        }
      })
  }

  public readonly insert = async (body: ProcessStepCM[]): Promise<ProcessStepVM[]> => {
    return await this.processConnectionRepository.useHTTP().save(body as any)
      .then((model) => {
        return this.findAll(model.map((e) => e.id));
      })
  }

  public readonly update = async (body: ProcessStepUM[]): Promise<ProcessStepVM[]> => {
    return await this.processConnectionRepository.useHTTP()
      .save(body)
      .then(() => {
        return this.findAll(body.map((e) => e.id));
      })
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.processConnectionRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.processConnectionRepository.useHTTP()
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