import { NotFoundException } from '@exceptions';
import { ProductExtraInformation } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { ProductExtraInformationRepository } from '@repositories';
import { PRODUCT_EXTRA_INFORMATION_REPOSITORY } from '@types';
import { ProductExtraInformationUM, ProductExtraInformationVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class ProductExtraInformationService {
  constructor(
    @Inject(PRODUCT_EXTRA_INFORMATION_REPOSITORY) protected readonly repository: ProductExtraInformationRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<ProductExtraInformationVM[]> => {
    return await this.repository.useHTTP()
    .find({where: (ids ? {id: In(ids)} : {}), relations: ["productExtraValues"]})
      .then((models) => this.mapper.mapArray(models, ProductExtraInformationVM, ProductExtraInformation))
  };

  public readonly findById = async (id: string): Promise<ProductExtraInformationVM> => {
    return await this.repository.useHTTP().findOne({ id: id }, { relations: ["productExtraValues"] })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, ProductExtraInformationVM, ProductExtraInformation);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = (body: ProductExtraInformationUM[]): Promise<any> => {
    return this.repository.useHTTP().save(body)
      .then(
        (models) => {
          console.log(models);
          const ids = [];
          models.map(model => ids.push(model.id));
          return this.findAll(ids);
        }
      )
  };
}
