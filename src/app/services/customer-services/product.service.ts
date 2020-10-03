import { InvalidException, NotFoundException } from '@exceptions';
import { Product, ProductExtraValue } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProductExtraInformationRepository, ProductExtraValueRepository, ProductRepository } from '@repositories';
import { PRODUCT_EXTRA_INFORMATION_REPOSITORY, PRODUCT_EXTRA_VALUE_REPOSITORY, PRODUCT_REPOSITORY } from '@types';
import { ProductCM, ProductUM, ProductVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) protected readonly repository: ProductRepository,
    @Inject(PRODUCT_EXTRA_VALUE_REPOSITORY) protected readonly customerExtraValueRepository: ProductExtraValueRepository,
    @Inject(PRODUCT_EXTRA_INFORMATION_REPOSITORY) protected readonly customerExtraInformationRepository: ProductExtraInformationRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (): Promise<ProductVM[]> => {
    return await this.repository.useHTTP().find()
      .then((models) => this.mapper.mapArray(models, ProductVM, Product))
  };

  public readonly findById = async (id: string): Promise<ProductVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, ProductVM, Product);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  // public readonly insert = (body: ProductCM): Promise<ProductVM> => {
  //   return this.repository.useHTTP().insert(body)
  //     .then((model) => (this.mapper.map(model.generatedMaps[0], ProductVM, Product as any)))
  // };

  public readonly insert = async (body: ProductCM): Promise<any> => {
    this.repository.useHTTP().save(body).then(async product => {
      const proExtrDatas = [];
      for(let index = 0; index < body.productExtrs.length; index++) {
        const productExtr = body.productExtrs[index];
        await this.customerExtraInformationRepository.useHTTP().findOne({ name: productExtr.name })
        .then(proExtrData => {
          if(proExtrData === undefined){
            throw new InvalidException(`invalid`)
          }
          const proExtInfo = new ProductExtraValue();
          proExtInfo.product = product;
          proExtInfo.productExtraInformation = proExtrData;
          proExtInfo.value = productExtr.value;
          proExtrDatas.push(proExtInfo);
        })
      }
      await this.customerExtraInformationRepository.useHTTP().save(proExtrDatas).then(e => console.log(e));
    })
  }

  public readonly update = async (body: ProductUM): Promise<ProductVM> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body)
          .then(() => (this.mapper.map(body, ProductVM, ProductUM)))
      });
  };

  public readonly remove = async (id: string): Promise<ProductVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly active = async (id: string): Promise<ProductVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then(() => {
            throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
      });
  };

  public readonly deactive = async (id: string): Promise<ProductVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then(() => {
            throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
      });
  };
}
