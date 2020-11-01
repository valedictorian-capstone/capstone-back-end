import { Process } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ProcessConnectionRepository, ProcessStepRepository } from "@repositories";
import { PROCESS_CONNECTION_REPOSITORY, PROCESS_REPOSITORY, PROCESS_STEP_REPOSITORY } from "@types";
import { ProcessCM, ProcessUM, ProcessVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { ProcessRepository } from "src/app/repositories/bpmn-repositories/process.repository";
import { In } from "typeorm";

@Injectable()
export class ProcessService {

  constructor(
    @Inject(PROCESS_REPOSITORY) protected readonly processRepository: ProcessRepository,
    @Inject(PROCESS_STEP_REPOSITORY) protected readonly processStepRepository: ProcessStepRepository,
    @Inject(PROCESS_CONNECTION_REPOSITORY) protected readonly processConnectionRepository: ProcessConnectionRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<any> => {
    return await this.processRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["processSteps", "processConnections"] })
      .then((models) => models);
  }

  public readonly findById = async (id: string): Promise<any> => {
    return await this.processRepository.useHTTP().findOne({ id: id }, { relations: ["processSteps", "processConnections"] })
      .then((model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return model;
        }
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
        const process = { ...body };
        const processSteps = process.processSteps;
        const processConnections = process.processConnections;
        const processConnectionIds = process.processConnectionIds;
        const processStepIds = process.processStepIds;
        delete process.processSteps;
        delete process.processConnections;
        await this.processRepository.useHTTP().save(process);
        await this.processStepRepository.useHTTP().save(processSteps);
        await this.processConnectionRepository.useHTTP().save(processConnections);
        await this.processConnectionRepository.useHTTP().remove(processConnectionIds.map((e) => ({ id: e } as any)));
        await this.processStepRepository.useHTTP().remove(processStepIds.map((e) => ({ id: e } as any)));
        return await this.findById(process.id);
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