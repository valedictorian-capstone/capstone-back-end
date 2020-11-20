import { Deal } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ActivityRepository, DealDetailRepository, DealRepository, ProductRepository, StageRepository } from "@repositories";
import { ACTIVITY_REPOSITORY, DEAL_DETAIL_REPOSITORY, DEAL_REPOSITORY, PRODUCT_REPOSITORY, STAGE_REPOSITORY } from "@types";
import { DealCM, DealUM, DealVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from 'typeorm';

@Injectable()
export class DealService {

  constructor(
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @Inject(STAGE_REPOSITORY) protected readonly stageRepository: StageRepository,
    @Inject(ACTIVITY_REPOSITORY) protected readonly activityRepository: ActivityRepository,
    @Inject(DEAL_DETAIL_REPOSITORY) protected readonly dealDetailRepository: DealDetailRepository,
    @Inject(PRODUCT_REPOSITORY) protected readonly productRepository: ProductRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (): Promise<DealVM[]> => {
    return await this.dealRepository.useHTTP().find({ relations: ['stage', 'customer'] })
      .then(async (models) => {
        return this.mapper.mapArray(models, DealVM, Deal);
      }
      )
  }


  public readonly findById = async (id: string): Promise<DealVM> => {
    return await this.dealRepository.useHTTP().findOne({ where: { id: id }, relations: ['stage', 'customer', 'dealDetails'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          model.dealDetails = await this.dealDetailRepository.useHTTP().find({ where: { deal: model }, relations: ['product'] });
          return this.mapper.map(model, DealVM, Deal)
        }
      })
  }

  public readonly findByStage = async (id: string): Promise<DealVM[]> => {
    return await this.dealRepository.useHTTP().find({ where: { stage: { id } }, relations: ['stage', 'customer', 'dealDetails'] })
      .then(async (deals) => {
        for (let i = 0; i < deals.length; i++) {
          const deal = deals[i];
          deal.dealDetails = await this.dealDetailRepository.useHTTP().find({ where: { id: In(deal.dealDetails.map((e) => e.id)) }, relations: ['product'] });
          if (deal.dealDetails.length > 0) {
            console.log(deal.dealDetails);
          }
        }
        return await this.mapper.mapArray(deals, DealVM, Deal);
      });
  }

  public readonly insert = async (body: DealCM): Promise<DealVM> => {

    return await this.dealRepository.useHTTP()
      .save(body as any)
      .then(async (model) => {
        await this.dealDetailRepository.useHTTP().save(body.dealDetails.map((e) => ({ ...e, deal: model })) as any);
        return await this.findById(model.id);
      })
  }

  public readonly update = async (body: DealUM): Promise<DealVM> => {
    return await this.dealRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.dealRepository.useHTTP()
          .save(body as any)
          .then((model) => {
            return this.findById(model.id);
          })
      });
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.dealRepository.useHTTP().findOne({ id: id }, { relations: ['dealDetails', 'activitys'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        await this.dealDetailRepository.useHTTP().remove(model.dealDetails);
        await this.activityRepository.useHTTP().remove(model.activitys);
        return await this.dealRepository.useHTTP()
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