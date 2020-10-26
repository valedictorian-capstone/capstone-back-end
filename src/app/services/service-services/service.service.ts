import { InvalidException, NotFoundException } from '@exceptions';
import { Service } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceRepository } from '@repositories';
import { SERVICE_REPOSITORY } from '@types';
import { ServiceCM, ServiceUM, ServiceVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @Inject(SERVICE_REPOSITORY) protected readonly serviceRepository: ServiceRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<ServiceVM[]> => {
    return await this.serviceRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: [] })
      .then(async (models) => {
        return this.mapper.mapArray(models, ServiceVM, Service)
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  };

  public readonly findById = async (id: string): Promise<ServiceVM> => {
    return await this.serviceRepository.useHTTP().findOne({ where: { id: id }, relations: [] })
      .then(async (model) => {
        if (model) {
          return this.mapper.map(model, ServiceVM, Service);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly checkUnique = async (label: string, value: string): Promise<string> => {
    const query = { [label]: value };
    return this.serviceRepository.useHTTP().findOne({ where: query })
      .then((model) =>{
        return model ? true : false;
      }).catch(err => err);
  }

  public readonly insert = async (body: ServiceCM[]): Promise<any> => {
    return await this.serviceRepository.useHTTP().save(body).then(async (services) => {
      return  "Inserted " + services.length;
    }).catch(err => err);
  };

  public readonly update = async (body: ServiceUM): Promise<ServiceVM> => {
    return await this.serviceRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }else{
          return await this.serviceRepository.useHTTP().save(body).then(async (Service) => {
            return await this.findById(Service.id);
          }).catch(err => err);
        }
      });
  };

  public readonly remove = async (id: string): Promise<ServiceVM> => {
    return await this.serviceRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.serviceRepository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly active = async (id: string): Promise<ServiceVM[]> => {
    return await this.serviceRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.serviceRepository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<ServiceVM[]> => {
    return await this.serviceRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.serviceRepository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}
