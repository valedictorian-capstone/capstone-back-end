import { NotFoundException } from '@exceptions';
import { ProductExtraInformation } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProductExtraInformationRepository } from '@repositories';
import { PRODUCT_EXTRA_INFORMATION_REPOSITORY } from '@types';
import { ProductExtraInformationCM, ProductExtraInformationUM, ProductExtraInformationVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class ProductExtraInformationService {
  constructor(
    @Inject(PRODUCT_EXTRA_INFORMATION_REPOSITORY) protected readonly repository: ProductExtraInformationRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (): Promise<ProductExtraInformationVM[]> => {
    return await this.repository.useHTTP().find()
      .then((models) => this.mapper.mapArray(models, ProductExtraInformationVM, ProductExtraInformation))
  };

  public readonly findById = async (id: string): Promise<ProductExtraInformationVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, ProductExtraInformationVM, ProductExtraInformation);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = (body: ProductExtraInformationCM): Promise<ProductExtraInformationVM> => {
    return this.repository.useHTTP().insert(body)
      .then((model) => (this.mapper.map(model.generatedMaps[0], ProductExtraInformationVM, ProductExtraInformation as any)))
  };

  public readonly update = async (body: ProductExtraInformationUM): Promise<ProductExtraInformationVM> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body)
          .then(() => (this.mapper.map(body, ProductExtraInformationVM, ProductExtraInformationUM)))
      });
  };

  public readonly remove = async (id: string): Promise<ProductExtraInformationVM> => {
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

  public readonly active = async (id: string): Promise<ProductExtraInformationVM> => {
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

  public readonly deactive = async (id: string): Promise<ProductExtraInformationVM> => {
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
