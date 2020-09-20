import { Inject, NotFoundException } from "@nestjs/common";
import { WF_REPOSITORY } from "@types";
import { WFCM, WFUM, WFVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { WF } from "@models";
import { WFRepository } from "src/app/repositories/bpmn-repositories/wf.repository";

export class WFService {

  constructor(
    @Inject(WF_REPOSITORY) protected readonly wfRepository: WFRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (): Promise<WFVM[]> => {
    return await this.wfRepository.useHTTP().find()
      .then((models) => this.mapper.mapArray(models, WFVM, WF))
  }

  public readonly findById = async (id: string): Promise<WFVM> => {
    return await this.wfRepository.useHTTP().findOne(id)
      .then((model) => {
        if (model) {
          this.mapper.map(model, WFVM, WF)
        }
        throw new NotFoundException(`WF Service function [findById] with [message]: can't find ${id}`,)
      })
  }

  public readonly insert = async (body: WFCM): Promise<WFVM> => {
    return await this.wfRepository.useHTTP().insert(body as any)
      .then((model) => this.mapper.map(model.generatedMaps[0], WFVM, WF))
  }

  public readonly update = async (body: WFUM): Promise<WFVM> => {
    return await this.wfRepository.useHTTP().findOne(body.id)
      .then(async () => {
        return await this.wfRepository.useHTTP()
          .save(body)
          .then((model) => (this.mapper.map(model, WFVM, WF)))
      });
  }
}