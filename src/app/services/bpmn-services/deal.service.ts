import { Deal } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DealRepository, StageRepository, ActivityRepository } from "@repositories";
import { DEAL_REPOSITORY, STAGE_REPOSITORY, ACTIVITY_REPOSITORY } from "@types";
import { DealCM, DealFilter, DealUM, DealVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

@Injectable()
export class DealService {

  constructor(
    @Inject(DEAL_REPOSITORY) protected readonly instanceRepository: DealRepository,
    @Inject(STAGE_REPOSITORY) protected readonly stepRepository: StageRepository,
    @Inject(ACTIVITY_REPOSITORY) protected readonly activityRepository: ActivityRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (DealFilter: DealFilter): Promise<DealVM[]> => {
    if (DealFilter.processId) {
      return await this.findByProcess(DealFilter.processId);
    } else if (DealFilter.customerId) {
      return await this.findByCustomer(DealFilter.customerId);
    } else {
      return await this.instanceRepository.useHTTP().find({ relations: ['process', 'customer'] })
        .then(async (models) => {
          return this.mapper.mapArray(models, DealVM, Deal);
        })
    }
  }

  public readonly findByProcess = async (id: string): Promise<DealVM[]> => {
    return await this.instanceRepository.useHTTP()
      .createQueryBuilder('processInstsance')
      .leftJoinAndSelect('processInstsance.process', 'process')
      .leftJoinAndSelect('processInstsance.customer', 'customer')
      .where('process.id= :id', { id: id })
      .getMany()
      .then((models) => this.mapper.mapArray(models, DealVM, Deal));
  }

  public readonly findByCustomer = async (id: string): Promise<DealVM[]> => {
    return await this.instanceRepository.useHTTP()
      .createQueryBuilder('processInstsance')
      .leftJoinAndSelect('processInstsance.customer', 'customer')
      .leftJoinAndSelect('processInstsance.process', 'process')
      .where('process.id= :id', { id: id })
      .getMany()
      .then((models) => this.mapper.mapArray(models, DealVM, Deal));
  }

  public readonly findById = async (id: string): Promise<DealVM> => {
    return await this.instanceRepository.useHTTP().findOne({ where: { id: id }, relations: ['process', 'customer'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, DealVM, Deal)
        }
      })
  }

  public readonly insert = async (body: DealCM): Promise<DealVM> => {
    return await this.instanceRepository.useHTTP()
    .save(body as any)
    .then((model) => {
      return this.findById(model.id);
    })
  }

  public readonly update = async (body: DealUM): Promise<DealVM> => {
    return await this.instanceRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.instanceRepository.useHTTP()
          .save(body as any)
          .then((model) => {
            return this.findById(model.id);
          })
      });
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.instanceRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.instanceRepository.useHTTP()
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