import { WFConnection } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WFConnectionRepository } from "@repositories";
import { WF_CONNECTION_REPOSITORY } from "@types";
import { WFConnectionCM, WFConnectionUM, WFConnectionVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from "typeorm";

@Injectable()
export class WFConnectionService {

  constructor(
    @Inject(WF_CONNECTION_REPOSITORY) protected readonly wfConnectionRepository: WFConnectionRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<any[]> => {
    return await this.wfConnectionRepository.useHTTP().find(ids ? { id: In(ids) } : {})
      .then((models) => models)
  }

  public readonly findById = async (id: string): Promise<WFConnectionVM> => {
    return await this.wfConnectionRepository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, WFConnectionVM, WFConnection)
        }
      })
  }

  public readonly insert = async (body: WFConnectionCM[]): Promise<WFConnectionVM[]> => {
    return await this.wfConnectionRepository.useHTTP().save(body as any)
      .then((model) => {
        return this.findAll(model.map((e) => e.id));
      })
  }

  public readonly update = async (body: WFConnectionUM[]): Promise<WFConnectionVM[]> => {
    return await this.wfConnectionRepository.useHTTP()
      .save(body)
      .then(() => {
        return this.findAll(body.map((e) => e.id));
      });
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.wfConnectionRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.wfConnectionRepository.useHTTP()
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