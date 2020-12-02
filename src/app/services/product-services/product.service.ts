import { InvalidException, NotFoundException } from '@exceptions';
import { Product } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '@repositories';
import { FIREBASE_SERVICE, PRODUCT_REPOSITORY } from '@types';
import { ProductCM, ProductUM, ProductVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';
import { FirebaseService } from '../extra-services';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) protected readonly productRepository: ProductRepository,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<ProductVM[]> => {
    return await this.productRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ['category'] })
      .then(async (models) => {
        return this.mapper.mapArray(models, ProductVM, Product)
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  };

  public readonly findById = async (id: string): Promise<ProductVM> => {
    return await this.productRepository.useHTTP().findOne({ where: { id: id }, relations: ['dealDetails', 'category', 'comments'] })
      .then(async (model) => {
        if (model) {
          return this.mapper.map(model, ProductVM, Product);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly checkUnique = async (label: string, value: string): Promise<string> => {
    const query = { [label]: value };
    return this.productRepository.useHTTP().findOne({ where: query })
      .then((model) =>{
        return model ? true : false;
      }).catch(err => err);
  }

  public readonly insert = async (body: ProductCM): Promise<any> => {
    const product = { ...body };
    if (product.image && product.image.includes(';base64')) {
      await this.firebaseService.useUploadFileBase64("product/images/" + product.name + "." + product.image.substring(product.image.indexOf("data:image/") + 11, product.image.indexOf(";base64")), product.image, product.image.substring(product.image.indexOf("data:image/") + 5, product.image.indexOf(";base64")));
      product.image = environment.firebase.linkDownloadFile + "product/images/" + product.name + "." + product.image.substring(product.image.indexOf("data:image/") + 11, product.image.indexOf(";base64"));
    }
    return await this.productRepository.useHTTP().save(product as any).then(async (product) => {
      return this.findById(product.id);
    }).catch(err => err);
  };
  public readonly import = async (body: ProductCM[]): Promise<any> => {
    return await this.productRepository.useHTTP().save(body as any).then(async (products) => {
      return this.findAll(products.map((e) => e.id));
    });
  };
  public readonly update = async (body: ProductUM): Promise<ProductVM> => {
    return await this.productRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }else{
          const product = { ...body };
          if (product.image && product.image.includes(';base64')) {
            await this.firebaseService.useUploadFileBase64("product/images/" + product.name + "." + product.image.substring(product.image.indexOf("data:image/") + 11, product.image.indexOf(";base64")), product.image, product.image.substring(product.image.indexOf("data:image/") + 5, product.image.indexOf(";base64")));
            product.image = environment.firebase.linkDownloadFile + "product/images/" + product.name + "." + product.image.substring(product.image.indexOf("data:image/") + 11, product.image.indexOf(";base64"));
          }
          return await this.productRepository.useHTTP().save(product as any).then(async (product) => {
            return await this.findById(product.id);
          });
        }
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
