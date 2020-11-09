import { ProcessStep } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProcessConnectionRepository, ProcessStepRepository } from "@repositories";
import { PROCESS_CONNECTION_REPOSITORY } from "@types";
import { ProcessStepCM, ProcessStepUM, ProcessStepVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { PROCESS_STEP_REPOSITORY } from "src/app/types/bpmn-types/process-step.type";
import { In } from "typeorm";

@Injectable()
export class ProcessStepService {

  constructor(
    @Inject(PROCESS_STEP_REPOSITORY) protected readonly processStepRepository: ProcessStepRepository,
    @Inject(PROCESS_CONNECTION_REPOSITORY) protected readonly processConnectionRepository: ProcessConnectionRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<ProcessStepVM[]> => {
    return await this.processStepRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: ["department", "processFromConnections", "processToConnections", "process", "formGroups"] })
      .then((models) => {
        return this.mapper.mapArray(models, ProcessStepVM, ProcessStep)
      });
  }

  public readonly findById = async (id: string): Promise<ProcessStepVM> => {
    return await this.processStepRepository.useHTTP().findOne({ where: { id: id }, relations: ["department", "processFromConnections", "processToConnections", "process", "formGroups"] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          model.processFromConnections = await this.processConnectionRepository.useHTTP()
            .find({ where: { id: In(model.processFromConnections.map((e) => e.id)) }, relations: ['toProcessStep', 'fromProcessStep'] });
          model.processToConnections = await this.processConnectionRepository.useHTTP()
            .find({ where: { id: In(model.processToConnections.map((e) => e.id)) }, relations: ['toProcessStep', 'fromProcessStep'] });
          return this.mapper.map(model, ProcessStepVM, ProcessStep)
        }
      })
  }

  public readonly checkUnique = async (label: string, value: string): Promise<boolean> => {
    const query = { [label]: value };
    return this.processStepRepository.useHTTP().findOne({ where: query })
      .then((model) => {
        return model ? true : false;
      })
  }

  public readonly insert = async (body: ProcessStepCM): Promise<ProcessStepVM> => {
    return await this.processStepRepository.useHTTP().save(body as any)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly update = async (body: ProcessStepUM): Promise<ProcessStepVM> => {
    if (body.processFromConnections || body.processToConnections) {
      await this.processConnectionRepository.useHTTP().save(body.processFromConnections as any);
      await this.processConnectionRepository.useHTTP().save(body.processToConnections as any);
      return await this.processStepRepository.useHTTP()
        .save({
          ...body,
        } as any)
        .then((model) => {
          return this.findById(model.id);
        })
    } else
      return await this.processStepRepository.useHTTP()
        .save(body as any)
        .then((model) => {
          return this.findById(model.id);
        })
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.processStepRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.processStepRepository.useHTTP()
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