import { NotFoundException } from '@exceptions';
import { Comment } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CommentRepository, CustomerRepository, ProductRepository } from '@repositories';
import { COMMENT_REPOSITORY, CUSTOMER_REPOSITORY, PRODUCT_REPOSITORY } from '@types';
import { CommentUM, CommentVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY) protected readonly repository: CommentRepository,
    @Inject(PRODUCT_REPOSITORY) protected readonly productRepository: ProductRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<CommentVM[]> => {
    return await this.repository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: [] })
      .then((models) => this.mapper.mapArray(models, CommentVM, Comment))
  };

  public readonly findById = async (id: string): Promise<CommentVM> => {
    return await this.repository.useHTTP().findOne({ where: {id: id}, relations: [] })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, CommentVM, Comment);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly findAllByProduct = async (id: string): Promise<CommentVM> => {

    const product = await this.productRepository.useHTTP().findOne(id);

    return await this.repository.useHTTP().findOne({ where: {product: product}, relations: ['customer'] })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, CommentVM, Comment);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly save = async (body: CommentUM): Promise<CommentVM> => {
    return await this.repository.useHTTP().save({... body, product: body.product, customer: body.customer})
    .then(async (model) => {
      return await this.findById(model.id);
    })
  };

  public readonly remove = async (id: string): Promise<CommentVM> => {
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

  public readonly active = async (id: string): Promise<CommentVM[]> => {
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

  public readonly deactive = async (id: string): Promise<CommentVM[]> => {
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
