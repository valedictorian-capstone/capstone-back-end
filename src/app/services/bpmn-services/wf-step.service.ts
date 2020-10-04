import { WFStep } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WFStepRepository } from "@repositories";
import { WFStepCM, WFStepUM, WFStepVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { WF_STEP_REPOSITORY } from "src/app/types/bpmn-types/work-step.type";
import { In } from "typeorm";

@Injectable()
export class WFStepService {

  constructor(
    @Inject(WF_STEP_REPOSITORY) protected readonly wfConnectionRepository: WFStepRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<WFStepVM[]> => {
    return await this.wfConnectionRepository.useHTTP().find(ids ? { id: In(ids) } : {})
      .then((models) => this.mapper.mapArray(models, WFStepVM, WFStep))
  }

  public readonly findById = async (id: string): Promise<WFStepVM> => {
    return await this.wfConnectionRepository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, WFStepVM, WFStep)
        }
      })
  }

  public readonly insert = async (body: WFStepCM): Promise<WFStepVM[]> => {
    return await this.wfConnectionRepository.useHTTP().save(body as any)
      .then((model) => {
        const ids = [];
        ids.push(model.id);
        return this.findAll(ids);
      })
  }

  public readonly update = async (body: WFStepUM): Promise<WFStepVM[]> => {
    return await this.wfConnectionRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.wfConnectionRepository.useHTTP()
          .save(body)
          .then((model) => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);})
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