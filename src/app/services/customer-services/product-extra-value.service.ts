import { NotFoundException } from '@exceptions';
import { ProductExtraValue } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProductExtraValueRepository } from '@repositories';
import { PRODUCT_EXTRA_VALUE_REPOSITORY } from '@types';
import { ProductExtraValueCM, ProductExtraValueUM, ProductExtraValueVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class ProductExtraValueService {
  constructor(
    @Inject(PRODUCT_EXTRA_VALUE_REPOSITORY) protected readonly repository: ProductExtraValueRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<ProductExtraValueVM[]> => {
    return await this.repository.useHTTP().find(ids ? { id: In(ids) } : {})
      .then((models) => this.mapper.mapArray(models, ProductExtraValueVM, ProductExtraValue))
  };

  public readonly findById = async (id: string): Promise<ProductExtraValueVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, ProductExtraValueVM, ProductExtraValue);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = (body: ProductExtraValueCM): Promise<ProductExtraValueVM[]> => {
    return this.repository.useHTTP().save(body)
      .then((model) => {
        const ids = [];
        ids.push(model.id);
        return this.findAll(ids);
      })
  };

  public readonly update = async (body: ProductExtraValueUM): Promise<ProductExtraValueVM[]> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body)
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly remove = async (id: string): Promise<ProductExtraValueVM> => {
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

  public readonly active = async (id: string): Promise<ProductExtraValueVM[]> => {
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
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<ProductExtraValueVM[]> => {
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
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}
