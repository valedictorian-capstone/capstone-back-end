import { ProcessInstance } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PROCESS_INSTANCE_REPOSITORY } from "@types";
import { ProcessInstanceCM, ProcessInstanceUM, ProcessInstanceVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { ProcessInstanceRepository } from "@repositories";
import { In } from "typeorm";

@Injectable()
export class ProcessInstanceService {

  constructor(
    @Inject(PROCESS_INSTANCE_REPOSITORY) protected readonly processRepository: ProcessInstanceRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<ProcessInstanceVM[]> => {
    return await this.processRepository.useHTTP().find(ids ? { id: In(ids) } : {})
      .then((models) => this.mapper.mapArray(models, ProcessInstanceVM, ProcessInstance))
  }

  public readonly findById = async (id: string): Promise<ProcessInstanceVM> => {
    return await this.processRepository.useHTTP().findOne({id: id})
      .then((model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, ProcessInstanceVM, ProcessInstance)
        }
      })
  }

  public readonly insert = async (body: ProcessInstanceCM): Promise<ProcessInstanceVM[]> => {
    return await this.processRepository.useHTTP().save(body as any)
      .then((model) => {
        const ids = [];
        ids.push(model.id);
        return this.findAll(ids);
      })
  }

  public readonly update = async (body: ProcessInstanceUM): Promise<ProcessInstanceVM[]> => {
    return await this.processRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.processRepository.useHTTP()
          .save(body)
          .then((model) => {
            const ids = [];
        ids.push(model.id);
        return this.findAll(ids);
          })
      });
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.processRepository.useHTTP().findOne({id: id})
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