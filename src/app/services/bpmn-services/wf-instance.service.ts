import { WFInstance } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WF_INSTANCE_REPOSITORY } from "@types";
import { WFInstanceCM, WFInstanceUM, WFInstanceVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { WFInstanceRepository } from "@repositories";
import { In } from "typeorm";

@Injectable()
export class WFInstanceService {

  constructor(
    @Inject(WF_INSTANCE_REPOSITORY) protected readonly wfRepository: WFInstanceRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<WFInstanceVM[]> => {
    return await this.wfRepository.useHTTP().find(ids ? { id: In(ids) } : {})
      .then((models) => this.mapper.mapArray(models, WFInstanceVM, WFInstance))
  }

  public readonly findById = async (id: string): Promise<WFInstanceVM> => {
    return await this.wfRepository.useHTTP().findOne({id: id})
      .then((model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, WFInstanceVM, WFInstance)
        }
      })
  }

  public readonly insert = async (body: WFInstanceCM): Promise<WFInstanceVM[]> => {
    return await this.wfRepository.useHTTP().save(body as any)
      .then((model) => {
        const ids = [];
        ids.push(model.id);
        return this.findAll(ids);
      })
  }

  public readonly update = async (body: WFInstanceUM): Promise<WFInstanceVM[]> => {
    return await this.wfRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.wfRepository.useHTTP()
          .save(body)
          .then((model) => {
            const ids = [];
        ids.push(model.id);
        return this.findAll(ids);
          })
      });
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.wfRepository.useHTTP().findOne({id: id})
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.wfRepository.useHTTP()
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