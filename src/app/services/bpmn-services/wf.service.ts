import { WF } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { WFConnectionRepository, WFStepRepository } from "@repositories";
import { WF_CONNECTION_REPOSITORY, WF_REPOSITORY, WF_STEP_REPOSITORY } from "@types";
import { WFCM, WFUM, WFVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { WFRepository } from "src/app/repositories/bpmn-repositories/wf.repository";
import { In } from "typeorm";

@Injectable()
export class WFService {

  constructor(
    @Inject(WF_REPOSITORY) protected readonly wfRepository: WFRepository,
    @Inject(WF_STEP_REPOSITORY) protected readonly wfStepRepository: WFStepRepository,
    @Inject(WF_CONNECTION_REPOSITORY) protected readonly wfConnectionRepository: WFConnectionRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<any> => {
    return await this.wfRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["wFSteps", "wfConnections"] })
      .then((models) => models);
  }

  public readonly findById = async (id: string): Promise<any> => {
    return await this.wfRepository.useHTTP().findOne({ id: id }, { relations: ["wFSteps", "wfConnections"] })
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

  public readonly insert = async (body: WFCM): Promise<WFVM> => {
    return await this.wfRepository.useHTTP().save(body as any)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly update = async (body: WFUM): Promise<any> => {
    return await this.wfRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        const workFlow = { ...body };
        const workFlowSteps = workFlow.workFlowSteps;
        const workFlowConnections = workFlow.workFlowConnections;
        const workFlowConnectionIds = workFlow.workFlowConnectionIds;
        const workFlowStepIds = workFlow.workFlowStepIds;
        delete workFlow.workFlowSteps;
        delete workFlow.workFlowConnections;
        await this.wfRepository.useHTTP().save(workFlow);
        await this.wfStepRepository.useHTTP().save(workFlowSteps);
        await this.wfConnectionRepository.useHTTP().save(workFlowConnections);
        await this.wfConnectionRepository.useHTTP().remove(workFlowConnectionIds.map((e) => ({ id: e } as any)));
        await this.wfStepRepository.useHTTP().remove(workFlowStepIds.map((e) => ({ id: e } as any)));
        return await this.findById(workFlow.id);
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