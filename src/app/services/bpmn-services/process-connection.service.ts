import { ProcessConnection } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProcessConnectionRepository } from "@repositories";
import { PROCESS_CONNECTION_REPOSITORY } from "@types";
import { ProcessConnectionCM, ProcessConnectionUM, ProcessConnectionVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from "typeorm";

@Injectable()
export class ProcessConnectionService {

  constructor(
    @Inject(PROCESS_CONNECTION_REPOSITORY) protected readonly processConnectionRepository: ProcessConnectionRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<any[]> => {
    return await this.processConnectionRepository.useHTTP().find(ids ? { id: In(ids) } : {})
      .then((models) => models)
  }

  public readonly findById = async (id: string): Promise<ProcessConnectionVM> => {
    return await this.processConnectionRepository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, ProcessConnectionVM, ProcessConnection)
        }
      })
  }

  public readonly insert = async (body: ProcessConnectionCM): Promise<ProcessConnectionVM> => {
    return await this.processConnectionRepository.useHTTP().save(body as any)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly update = async (body: ProcessConnectionUM): Promise<ProcessConnectionVM> => {
    return await this.processConnectionRepository.useHTTP()
      .save(body as any)
      .then(() => {
        return this.findById(body.id);
      });
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