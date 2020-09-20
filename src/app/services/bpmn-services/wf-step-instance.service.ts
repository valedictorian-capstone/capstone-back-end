import { WFStepInstance } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WFStepInstanceRepository } from "@repositories";
import { WF_STEP_INSTANCE_REPOSITORY } from "@types";
import { WFStepInstanceCM, WFStepInstanceUM, WFStepInstanceVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

@Injectable()
export class WFStepInstanceService {

  constructor(
    @Inject(WF_STEP_INSTANCE_REPOSITORY) protected readonly wFStepInstanceRepository: WFStepInstanceRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (): Promise<WFStepInstanceVM[]> => {
    return await this.wFStepInstanceRepository.useHTTP().find()
      .then((models) => this.mapper.mapArray(models, WFStepInstanceVM, WFStepInstance))
  }

  public readonly findById = async (id: string): Promise<WFStepInstanceVM> => {
    return await this.wFStepInstanceRepository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, WFStepInstanceVM, WFStepInstance)
        }
      })
  }

  public readonly insert = async (body: WFStepInstanceCM): Promise<WFStepInstanceVM> => {
    return await this.wFStepInstanceRepository.useHTTP().insert(body as any)
      .then((model) => this.mapper.map(model.generatedMaps[0], WFStepInstanceVM, WFStepInstance))
  }

  public readonly update = async (body: WFStepInstanceUM): Promise<WFStepInstanceVM> => {
    return await this.wFStepInstanceRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.wFStepInstanceRepository.useHTTP()
          .save(body)
          .then((model) => (this.mapper.map(model, WFStepInstanceVM, WFStepInstance)))
      });
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.wFStepInstanceRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.wFStepInstanceRepository.useHTTP()
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