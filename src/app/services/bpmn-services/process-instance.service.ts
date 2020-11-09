import { ProcessInstance } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AccountDepartmentRepository, CommentRepository, DepartmentRepository, ProcessInstanceRepository, ProcessStepInstanceRepository, ProcessStepRepository, TaskRepository } from "@repositories";
import { ACCOUNT_DEPARTMENT_REPOSITORY, COMMENT_REPOSITORY, DEPARTMENT_REPOSITORY, PROCESS_INSTANCE_REPOSITORY, PROCESS_STEP_INSTANCE_REPOSITORY, PROCESS_STEP_REPOSITORY, TASK_REPOSITORY } from "@types";
import { ProcessInstanceCM, ProcessInstanceFilter, ProcessInstanceUM, ProcessInstanceVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from 'typeorm';

@Injectable()
export class ProcessInstanceService {

  constructor(
    @Inject(PROCESS_INSTANCE_REPOSITORY) protected readonly instanceRepository: ProcessInstanceRepository,
    @Inject(PROCESS_STEP_REPOSITORY) protected readonly stepRepository: ProcessStepRepository,
    @Inject(PROCESS_STEP_INSTANCE_REPOSITORY) protected readonly stepInstanceRepository: ProcessStepInstanceRepository,
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
      return await this.instanceRepository.useHTTP().find({ relations: ['process', 'customer', 'processStepInstances'] })
        .then(async (models) => {
          for (let i = 0; i < models.length; i++) {
            const instance = models[i];
            instance.processStepInstances = await this.stepInstanceRepository.useHTTP()
              .find({ where: { id: In(instance.processStepInstances.map((e) => e.id)) }, relations: ['processInstance', 'processStep', 'tasks', 'comments', 'formDatas'] });
            instance.processStepInstances = instance.processStepInstances.sort((a, b) => b.createdAt > a.createdAt ? 1 : -1);
          }
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
    return await this.instanceRepository.useHTTP().findOne({ where: { id: id }, relations: ['process', 'customer', 'processStepInstances'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          model.processStepInstances = await this.stepInstanceRepository.useHTTP()
            .find({ where: { id: In(model.processStepInstances.map((e) => e.id)) }, relations: ['processInstance', 'processStep', 'tasks', 'comments', 'formDatas'] })
            .then(async (models) => {
              for (let i = 0; i < models.length; i++) {
                const stepInstance = models[i];
                stepInstance.processStep = await this.stepRepository.useHTTP().findOne({ where: { id: stepInstance.processStep.id }, relations: ["department", "processFromConnections", "processToConnections", "process", "formGroups"] })
                  .then(async (processStep) => {
                    processStep.department = await this.departmentRepository.useHTTP().findOne({ id: processStep.department.id }, { relations: ["accountDepartments"] })
                      .then(async (dep) => {
                        dep.accountDepartments = await this.accountDepartmentRepository.useHTTP().find({ where: { id: In(dep.accountDepartments.map((e) => e.id)) }, relations: ['account'] })
                        return dep;
                      });
                    return processStep;
                  });
                stepInstance.tasks = await this.taskRepository.useHTTP().find({ where: { id: In(stepInstance.tasks.map((e) => e.id)) }, relations: ['assignee', 'customer', 'assignBy'] });
                stepInstance.tasks.sort((a, b) => b.createdAt > a.createdAt ? 1 : -1);
                stepInstance.comments = await this.commentRepository.useHTTP().find({ where: { id: In(stepInstance.comments.map((e) => e.id)) }, relations: ['account'] });
                stepInstance.comments.sort((a, b) => b.createdAt > a.createdAt ? -1 : 1);
              }
              return models;
            });
          model.processStepInstances = model.processStepInstances.sort((a, b) => {
            if (a.processStep.type === 'event') {
              if (a.processStep.subType === 'start') {
                return -1;
              } else {
                return 1;
              }
            }
            if (b.processStep.type === 'event') {
              if (b.processStep.subType === 'start') {
                return -1;
              } else {
                return 1;
              }
            }
            return b.createdAt > a.createdAt ? 1 : -1;
          });
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
          this.stepInstanceRepository.useHTTP().insert([
            {
              processInstance: model,
              processStep: body.process.processSteps.find((e) => e.type === 'event' && e.subType === 'start') as any,
              status: 'done'
            },
            {
              processInstance: model,
              processStep: body.process.processSteps.find((e) => e.type === 'event' && e.subType === 'start').processFromConnections[0].toProcessStep as any,
              status: 'processing'
            }
          ])
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