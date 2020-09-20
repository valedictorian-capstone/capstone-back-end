import { WFConnection } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WFConnectionRepository } from "@repositories";
import { WF_CONNECTION_REPOSITORY } from "@types";
import { WFConnectionCM, WFConnectionUM, WFConnectionVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

@Injectable()
export class WFConnectionService {

  constructor(
    @Inject(WF_CONNECTION_REPOSITORY) protected readonly wfConnectionRepository: WFConnectionRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (): Promise<WFConnectionVM[]> => {
    return await this.wfConnectionRepository.useHTTP().find()
      .then((models) => this.mapper.mapArray(models, WFConnectionVM, WFConnection))
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

  public readonly insert = async (body: WFConnectionCM): Promise<WFConnectionVM> => {
    return await this.wfConnectionRepository.useHTTP().insert(body as any)
      .then((model) => this.mapper.map(model.generatedMaps[0], WFConnectionVM, WFConnection))
  }

  public readonly update = async (body: WFConnectionUM): Promise<WFConnectionVM> => {
    return await this.wfConnectionRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.wfConnectionRepository.useHTTP()
          .save(body)
          .then((model) => (this.mapper.map(model, WFConnectionVM, WFConnection)))
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