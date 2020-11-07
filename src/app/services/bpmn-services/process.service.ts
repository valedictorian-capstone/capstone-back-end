import { Process } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProcessConnectionRepository, ProcessInstanceRepository, ProcessStepRepository } from "@repositories";
import { PROCESS_CONNECTION_REPOSITORY, PROCESS_INSTANCE_REPOSITORY, PROCESS_REPOSITORY, PROCESS_STEP_REPOSITORY } from "@types";
import { ProcessCM, ProcessUM, ProcessVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { ProcessRepository } from "src/app/repositories/bpmn-repositories/process.repository";
import { In } from "typeorm";

@Injectable()
export class ProcessService {

  constructor(
    @Inject(PROCESS_REPOSITORY) protected readonly processRepository: ProcessRepository,
    @Inject(PROCESS_STEP_REPOSITORY) protected readonly processStepRepository: ProcessStepRepository,
    @Inject(PROCESS_INSTANCE_REPOSITORY) protected readonly processInstanceRepository: ProcessInstanceRepository,
    @Inject(PROCESS_CONNECTION_REPOSITORY) protected readonly processConnectionRepository: ProcessConnectionRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<any> => {
    return await this.processRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["processSteps", "processConnections", "processInstances"] })
      .then((models) => this.mapper.mapArray(models, ProcessVM, Process));
  }

  public readonly findById = async (id: string): Promise<any> => {
    return await this.processRepository.useHTTP().findOne({ id: id }, { relations: ["processSteps", "processConnections", "processInstances"] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          model.processInstances = await this.processInstanceRepository.useHTTP()
            .find({ where: { id: In(model.processInstances.map((e) => e.id)) }, relations: ['process', 'customer', 'processStepInstances'] });
          return this.mapper.map(model, ProcessVM, Process);
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

  public readonly insert = async (body: ProcessCM): Promise<ProcessVM> => {
    return await this.processRepository.useHTTP().save(body as any)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly update = async (body: ProcessUM): Promise<any> => {
    return await this.processRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        await this.processRepository.useHTTP().save({ ...model, ...body } as any);
        return await this.findById(body.id);
      });
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