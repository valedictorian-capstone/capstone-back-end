import { Category } from "@models";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CategoryRepository, ProductRepository } from "@repositories";
import { CATEGORY_REPOSITORY, PRODUCT_REPOSITORY, SOCKET_SERVICE } from "@types";
import { CategoryCM, CategoryUM, CategoryVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from "typeorm";
import { SocketService } from "../extra-services";

@Injectable()
export class CategoryService {

  constructor(
    @Inject(CATEGORY_REPOSITORY) protected readonly categoryRepository: CategoryRepository,
    @Inject(PRODUCT_REPOSITORY) protected readonly productRepository: ProductRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }
  public readonly findAll = async (ids?: string[]): Promise<CategoryVM[]> => {
    return await this.categoryRepository.useHTTP().find({
      where: ids ? { id: In(ids) } : {}, relations: ['products']
    })
      .then((models) => {
        return this.mapper.mapArray(models, CategoryVM, Category)
      });
  }
  public readonly findById = async (id: string): Promise<CategoryVM> => {
    return await this.categoryRepository.useHTTP().findOne({ where: { id: id }, relations: ["products"] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, CategoryVM, Category)
        }
      })
  }
  public readonly save = async (body: CategoryCM | CategoryUM): Promise<CategoryVM> => {
    return await this.categoryRepository.useHTTP().save(body)
      .then(async (model) => {
        const rs = await this.findById(model.id)
        this.socketService.with('categorys', rs, (body as CategoryUM).id ? 'update' : 'create');
        return rs;
      })
  }
  public readonly remove = async (id: string): Promise<any> => {
    return await this.categoryRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.categoryRepository.useHTTP().remove(model)
          .then(async () => {
            const rs = this.mapper.map({ ...model, id } as Category, CategoryVM, Category);
            this.socketService.with('categorys', rs, 'remove');
            return rs;
          })
      });
  }
}