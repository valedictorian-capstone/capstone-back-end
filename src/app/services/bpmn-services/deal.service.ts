import { Deal } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DealRepository, StageRepository, ActivityRepository, DealDetailRepository, ProductRepository } from "@repositories";
import { DEAL_REPOSITORY, STAGE_REPOSITORY, ACTIVITY_REPOSITORY, DEAL_DETAIL_REPOSITORY, PRODUCT_REPOSITORY } from "@types";
import { DealCM, DealFilter, DealUM, DealVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

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
    return await this.dealRepository.useHTTP().findOne({ where: { id: id }, relations: ['stage', 'customer'] })
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

  public readonly findByStage = async (id: string): Promise<DealVM> => {

    const stage = await this.stageRepository.useHTTP().findOne(id);

    return await this.dealRepository.useHTTP().findOne({ where: { stage: stage }, relations: ['stage'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          const dealDetails = await this.dealDetailRepository.useHTTP().find({where: { deal: model }, relations: [ 'product' ]});
          let totalPrice = 0;
          if(dealDetails){
            for (let index = 0; index < dealDetails.length; index++) {
              totalPrice = await totalPrice + ( dealDetails[index].quantity * dealDetails[index].product.price);
            }
          }
          const result = await this.mapper.map(model, DealVM, Deal);
          result.totalPrice = totalPrice;
          return result;
        }
      })
  }

  public readonly insert = async (body: DealCM): Promise<DealVM> => {

    const stage = await this.stageRepository.useHTTP().findOne(body.stage.id);

    return await this.dealRepository.useHTTP()
    .save(body)
    .then(async (model) => {
      await this.dealRepository.useHTTP().save({...model, stage: stage})
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
    return await this.dealRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
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