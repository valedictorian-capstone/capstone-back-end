import { InvalidException, NotFoundException } from '@exceptions';
import { Product, ProductExtraInformationData } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProductExtraInformationDataRepository, ExtraInformationRepository, ProductRepository } from '@repositories';
import { PRODUCT_EXTRA_INFORMATION_DATA_REPOSITORY, EXTRA_INFORMATION_REPOSITORY, PRODUCT_REPOSITORY } from '@types';
import { ProductCM, ProductUM, ProductVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) protected readonly productRepository: ProductRepository,
    @Inject(EXTRA_INFORMATION_REPOSITORY) protected readonly extraInformationRepository: ExtraInformationRepository,
    @Inject(PRODUCT_EXTRA_INFORMATION_DATA_REPOSITORY) protected readonly productExtraInformationRepository: ProductExtraInformationDataRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<ProductVM[]> => {
    return await this.productRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["productExtraInformationDatas"] })
      .then(async (models) => {
        for (const model of models) {
          model.productExtraInformationDatas = await this.productExtraInformationRepository.useHTTP().find({ where: { product: model }, relations: ["extraInformation", "product"] });
        }
        return this.mapper.mapArray(models, ProductVM, Product)
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  };

  public readonly findById = async (id: string): Promise<ProductVM> => {
    return await this.productRepository.useHTTP().findOne({ where: { id: id }, relations: ["productExtraInformationDatas"] })
      .then(async (model) => {
        if (model) {
          model.productExtraInformationDatas = await this.productExtraInformationRepository.useHTTP().find({ where: { product: model }, relations: ["extraInformation", "product"] });
          return this.mapper.map(model, ProductVM, Product);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = async (body: ProductCM): Promise<any> => {
    return await this.productRepository.useHTTP().save(body).then(async (product) => {
      await this.productExtraInformationRepository.useHTTP().save(body.productExtras.map((e) => ({ ...e, product })));
      return await this.findById(product.id);
    }).catch(err => err);
  };

  public readonly update = async (body: ProductUM): Promise<ProductVM> => {
    return await this.productRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        await this.productExtraInformationRepository.useHTTP().save(body.productExtras.map((e) => ({ ...e, product: model })));
        return await this.findById(model.id);
      });
  };

  public readonly remove = async (id: string): Promise<ProductVM> => {
    return await this.productRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.productRepository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly active = async (id: string): Promise<ProductVM[]> => {
    return await this.productRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.productRepository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<ProductVM[]> => {
    return await this.productRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.productRepository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}
