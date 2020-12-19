import { InvalidException, NotFoundException } from '@exceptions';
import { Product } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '@repositories';
import { FIREBASE_SERVICE, PRODUCT_REPOSITORY, SOCKET_SERVICE } from '@types';
import { ProductCM, ProductUM, ProductVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { environment } from 'src/environments/environment';
import { In } from 'typeorm';
import { FirebaseService, SocketService } from '../extra-services';
import { uuid } from 'uuidv4';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) protected readonly productRepository: ProductRepository,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
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
    return await this.productRepository.useHTTP().findOne({ where: { id: id }, relations: ['dealDetails', 'category'] })
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
      .then((model) => {
        return model ? true : false;
      }).catch(err => err);
  }
  public readonly insert = async (body: ProductCM): Promise<any> => {
    const product = { ...body };
    if (product.image && product.image.includes(';base64')) {
      product.image = await this.solveImage(product.image) as any;
    }
    return await this.productRepository.useHTTP().save(product as any).then(async (product) => {
      const rs = await this.findById(product.id)
      this.socketService.with('products', rs, 'create');
      return rs;
    }).catch(err => err);
  };
  public readonly import = async (body: ProductCM[]): Promise<any> => {
    for (const product of body) {
      if (product.image && product.image.includes(';base64')) {
        product.image = await this.solveImage(product.image) as any;
      }
    }
    return await this.productRepository.useHTTP().save(body as any).then(async (products) => {
      const rs = await this.findAll(products.map((e) => e.id));
      this.socketService.with('products', rs, 'list');
      return rs;
    });
  };
  public readonly update = async (body: ProductUM): Promise<ProductVM> => {
    return await this.productRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        } else {
          const product = { ...body };
          if (product.image && product.image.includes(';base64')) {
            product.image = await this.solveImage(product.image) as any;
          }
          return await this.productRepository.useHTTP().save(product as any).then(async (product) => {
            const rs = await this.findById(product.id)
            this.socketService.with('products', rs, 'update');
            return rs;
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
          .save({ id, isDelete: true })
          .then(async (model) => {
            const rs = await this.findById(model.id)
            this.socketService.with('products', rs, 'update');
            return rs;
          })
      });
  };
  public readonly restore = async (id: string): Promise<ProductVM> => {
    return await this.productRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.productRepository.useHTTP()
          .save({ id, isDelete: false })
          .then(async (model) => {
            const rs = await this.findById(model.id)
            this.socketService.with('products', rs, 'update');
            return rs;
          })
      });
  };
  private readonly solveImage = async (image: string) => {
    const id = uuid();
    await this.firebaseService.useUploadFileBase64("product/images/" + id + "." + image.substring(image.indexOf("data:image/") + 11, image.indexOf(";base64")), image, image.substring(image.indexOf("data:image/") + 5, image.indexOf(";base64")));
    return environment.firebase.linkDownloadFile + "product/images/" + id + "." + image.substring(image.indexOf("data:image/") + 11, image.indexOf(";base64"));
  }
}
