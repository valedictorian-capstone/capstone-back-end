import { ProcessInstance } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AccountDepartmentRepository, CommentRepository, DepartmentRepository, ProcessInstanceRepository, ProcessStepRepository, TaskRepository } from "@repositories";
import { ACCOUNT_DEPARTMENT_REPOSITORY, COMMENT_REPOSITORY, DEPARTMENT_REPOSITORY, PROCESS_INSTANCE_REPOSITORY, PROCESS_STEP_REPOSITORY, TASK_REPOSITORY } from "@types";
import { ProcessInstanceCM, ProcessInstanceFilter, ProcessInstanceUM, ProcessInstanceVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

@Injectable()
export class ProcessInstanceService {

  constructor(
    @Inject(PROCESS_INSTANCE_REPOSITORY) protected readonly instanceRepository: ProcessInstanceRepository,
    @Inject(PROCESS_STEP_REPOSITORY) protected readonly stepRepository: ProcessStepRepository,
    @Inject(TASK_REPOSITORY) protected readonly taskRepository: TaskRepository,
    @Inject(COMMENT_REPOSITORY) protected readonly commentRepository: CommentRepository,
    @Inject(DEPARTMENT_REPOSITORY) protected readonly departmentRepository: DepartmentRepository,
    @Inject(ACCOUNT_DEPARTMENT_REPOSITORY) protected readonly accountDepartmentRepository: AccountDepartmentRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (processInstanceFilter: ProcessInstanceFilter): Promise<ProcessInstanceVM[]> => {
    if (processInstanceFilter.processId) {
      return await this.findByProcess(processInstanceFilter.processId);
    } else if (processInstanceFilter.customerId) {
      return await this.findByCustomer(processInstanceFilter.customerId);
    } else {
      return await this.instanceRepository.useHTTP().find({ relations: ['process', 'customer'] })
        .then(async (models) => {
          return this.mapper.mapArray(models, ProcessInstanceVM, ProcessInstance);
        })
    }
  }

  public readonly findByProcess = async (id: string): Promise<ProcessInstanceVM[]> => {
    return await this.instanceRepository.useHTTP()
      .createQueryBuilder('processInstsance')
      .leftJoinAndSelect('processInstsance.process', 'process')
      .leftJoinAndSelect('processInstsance.customer', 'customer')
      .where('process.id= :id', { id: id })
      .getMany()
      .then((models) => this.mapper.mapArray(models, ProcessInstanceVM, ProcessInstance));
  }

  public readonly findByCustomer = async (id: string): Promise<ProcessInstanceVM[]> => {
    return await this.instanceRepository.useHTTP()
      .createQueryBuilder('processInstsance')
      .leftJoinAndSelect('processInstsance.customer', 'customer')
      .leftJoinAndSelect('processInstsance.process', 'process')
      .where('process.id= :id', { id: id })
      .getMany()
      .then((models) => this.mapper.mapArray(models, ProcessInstanceVM, ProcessInstance));
  }

  public readonly findById = async (id: string): Promise<ProcessInstanceVM> => {
    return await this.instanceRepository.useHTTP().findOne({ where: { id: id }, relations: ['process', 'customer'] })
      .then(async (model) => {
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
    if (
      body.process.processSteps.find((e) => e.type === 'event' && e.subType === 'end') &&
      body.process.processSteps.find((e) => e.type === 'event' && e.subType === 'start') &&
      body.process.processSteps.find((e) => e.type === 'event' && e.subType === 'start').processFromConnections.length === 1
    ) {
      return await this.instanceRepository.useHTTP().save({
        ...body, code: `${body.process.code}-${body.customer.code}-${Array(10).fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
          .map((x) => x[Math.floor(Math.random() * x.length)]).join('')}`
      } as any)
        .then((model) => {
          return this.findById(model.id);
        })
    }
    throw new HttpException(
      `${body.process.code + '-' + body.process.name} is invalid to create new instance`,
      HttpStatus.NO_CONTENT,
    );
  }

  public readonly update = async (body: ProcessInstanceUM): Promise<ProcessInstanceVM> => {
    return await this.instanceRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.instanceRepository.useHTTP()
          .save(body as any)
          .then((model) => {
            return this.findById(model.id);
          })
      });
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.instanceRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.instanceRepository.useHTTP()
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