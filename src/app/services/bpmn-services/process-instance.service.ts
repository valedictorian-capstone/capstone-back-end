import { ProcessInstance } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProcessInstanceRepository } from "@repositories";
import { PROCESS_INSTANCE_REPOSITORY } from "@types";
import { ProcessInstanceCM, ProcessInstanceFilter, ProcessInstanceUM, ProcessInstanceVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

@Injectable()
export class ProcessInstanceService {

  constructor(
    @Inject(PROCESS_INSTANCE_REPOSITORY) protected readonly processRepository: ProcessInstanceRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (processInstanceFilter: ProcessInstanceFilter): Promise<ProcessInstanceVM[]> => {
    if (processInstanceFilter.processId) {
      return await this.findByProcess(processInstanceFilter.processId);
    } else if (processInstanceFilter.customerId) {
      return await this.findByCustomer(processInstanceFilter.customerId);
    } else {
      return await this.processRepository.useHTTP().find({ relations: ['process', 'customer'] })
        .then((models) => this.mapper.mapArray(models, ProcessInstanceVM, ProcessInstance))
    }
  }

  public readonly findByProcess = async (id: string): Promise<ProcessInstanceVM[]> => {
    return await this.processRepository.useHTTP()
      .createQueryBuilder('processInstsance')
      .leftJoinAndSelect('processInstsance.process', 'process')
      .leftJoinAndSelect('processInstsance.customer', 'customer')
      .where('process.id= :id', { id: id })
      .getMany()
      .then((models) => this.mapper.mapArray(models, ProcessInstanceVM, ProcessInstance));
  }

  public readonly findByCustomer = async (id: string): Promise<ProcessInstanceVM[]> => {
    return await this.processRepository.useHTTP()
      .createQueryBuilder('processInstsance')
      .leftJoinAndSelect('processInstsance.customer', 'customer')
      .leftJoinAndSelect('processInstsance.process', 'process')
      .where('process.id= :id', { id: id })
      .getMany()
      .then((models) => this.mapper.mapArray(models, ProcessInstanceVM, ProcessInstance));
  }

  public readonly findById = async (id: string): Promise<ProcessInstanceVM> => {
    return await this.processRepository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, ProcessInstanceVM, ProcessInstance)
        }
      })
  }

  public readonly insert = async (body: ProcessInstanceCM): Promise<ProcessInstanceVM> => {
    return await this.processRepository.useHTTP().save({
      ...body, code: `${body.process.code}-${body.customer.code}-${Array(10).fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
        .map((x) => x[Math.floor(Math.random() * x.length)]).join('')}`
    } as any)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly update = async (body: ProcessInstanceUM): Promise<ProcessInstanceVM> => {
    return await this.processRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.processRepository.useHTTP()
          .save(body as any)
          .then((model) => {
            return this.findById(model.id);
          })
      });
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.processRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.processRepository.useHTTP()
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