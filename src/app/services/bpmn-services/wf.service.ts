import { WF } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { WF_REPOSITORY } from "@types";
import { WFCM, WFUM, WFVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { WFRepository } from "src/app/repositories/bpmn-repositories/wf.repository";

@Injectable()
export class WFService {

  constructor(
    @Inject(WF_REPOSITORY) protected readonly wfRepository: WFRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (): Promise<WFVM[]> => {
    return await this.wfRepository.useHTTP().find({relations: ["wFSteps"]})
      .then((models) => {Logger.log(models); return this.mapper.mapArray(models, WFVM, WF)})
      .catch(e => {Logger.error(e); return null;})
  }

  public readonly findById = async (id: string): Promise<WFVM> => {
    return await this.wfRepository.useHTTP().findOne({ id: id }, { relations: ["WFStep", "WFCondition"] })
      .then((model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, WFVM, WF)
        }
      })
  }

  public readonly insert = async (body: WFCM): Promise<WFVM> => {
    return await this.wfRepository.useHTTP().save(body as any)
      .then((model) => this.mapper.map(model.generatedMaps[0], WFVM, WF))
  }

  public readonly update = async (body: WFUM): Promise<WFVM> => {
    return await this.wfRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.wfRepository.useHTTP()
          .save(body)
          .then((model) => (this.mapper.map(model, WFVM, WF)))
      });
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.wfRepository.useHTTP().findOne({ id: id })
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