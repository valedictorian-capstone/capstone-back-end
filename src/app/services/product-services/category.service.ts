import { Category } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CategoryRepository, ProductRepository } from "@repositories";
import { CATEGORY_REPOSITORY, PRODUCT_REPOSITORY } from "@types";
import { CategoryCM, CategoryVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from "typeorm";

@Injectable()
export class CategoryService {

  constructor(
    @Inject(CATEGORY_REPOSITORY) protected readonly categoryRepository: CategoryRepository,
    @Inject(PRODUCT_REPOSITORY) protected readonly productRepository: ProductRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<CategoryVM[]> => {
    return await this.categoryRepository.useHTTP().find({
      where: ids ? { id: In(ids) } : {}, relations: []
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


  public readonly save = async (body: CategoryCM): Promise<CategoryVM> => {
    return await this.categoryRepository.useHTTP().save(body)
      .then(async (model) => {
        return await this.findById(model.id);
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
        return await this.categoryRepository.useHTTP()
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