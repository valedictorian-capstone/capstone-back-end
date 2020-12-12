import { NotFoundException } from '@exceptions';
import { Comment } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { CommentRepository, ProductRepository } from '@repositories';
import { SocketService } from '@services';
import { COMMENT_REPOSITORY, PRODUCT_REPOSITORY, SOCKET_SERVICE } from '@types';
import { CommentCM, CommentUM, CommentVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY) protected readonly repository: CommentRepository,
    @Inject(PRODUCT_REPOSITORY) protected readonly productRepository: ProductRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<CommentVM[]> => {
    return await this.repository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ['customer', 'product'] })
      .then((models) => this.mapper.mapArray(models, CommentVM, Comment))
  };
  public readonly findById = async (id: string): Promise<CommentVM> => {
    return await this.repository.useHTTP().findOne({ where: {id: id}, relations: ['customer', 'product'] })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, CommentVM, Comment);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };
  public readonly findAllByProduct = async (id: string): Promise<CommentVM[]> => {

    const product = await this.productRepository.useHTTP().findOne(id);

    return await this.repository.useHTTP().find({ where: {product: product}, relations: ['customer'] })
      .then((model) => {
        if (model) {
          return this.mapper.mapArray(model, CommentVM, Comment);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };
  public readonly save = async (body: CommentUM): Promise<CommentVM> => {
    return await this.repository.useHTTP().save(body)
      .then(async (model) => {
        const rs = await this.findById(model.id);
        this.socketService.with('comment-product-' + body.product.id, rs, 'update');
      return rs;
    })
  };
  public readonly insert = async (body: CommentCM): Promise<CommentVM> => {
    return await this.repository.useHTTP().save(body)
      .then(async (model) => {
        const rs = await this.findById(model.id);
        this.socketService.with('comment-product-' + body.product.id, rs, 'create');
      return rs;
    })
  };
  public readonly remove = async (id: string): Promise<CommentVM> => {
    return await this.repository.useHTTP().findOne({ id: id }, {relations: ['product']})
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .remove(model)
          .then(() => {
            const rs = this.mapper.map({...model, id} as Comment, CommentVM, Comment);
            this.socketService.with('comment-product-' + model.product.id, rs, 'remove');
            return rs;
          })
      });
  };
}
