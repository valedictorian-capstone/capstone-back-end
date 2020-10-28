import { FormData } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FormDataRepository, FormGroupRepository, WFStepInstanceRepository } from '@repositories';
import { FORM_DATA_REPOSITORY, FORM_GROUP_REPOSITORY, WF_STEP_INSTANCE_REPOSITORY, WF_STEP_REPOSITORY } from '@types';
import { FormDataCM, FormDataUM, FormDataVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { NotFoundException } from '@exceptions';
import { In } from 'typeorm';

@Injectable()
export class FormDataService {

    constructor(
        @Inject(FORM_DATA_REPOSITORY) protected readonly repository: FormDataRepository,
        @Inject(FORM_GROUP_REPOSITORY) protected readonly formGroupRepository: FormGroupRepository,
        @Inject(WF_STEP_INSTANCE_REPOSITORY) protected readonly processStepInstanceRepository: WFStepInstanceRepository,
        @InjectMapper() protected readonly mapper: AutoMapper
    ) { }

    public readonly findAll = async (ids?: string[]): Promise<FormDataVM[]> => {
        return await this.repository.useHTTP().find({where: (ids ? { id: In(ids) } : {}), relations: ["formGroup", "wFStepInstance"] })
            .then((models) => this.mapper.mapArray(models, FormDataVM, FormData))
    };

    public readonly findById = async (id: string): Promise<FormDataVM> => {
        return await this.repository.useHTTP().findOne({ id: id })
            .then((model) => {
                if (model) {
                    return this.mapper.map(model, FormDataVM, FormData);
                }
                throw new NotFoundException(
                    `Can not find ${id}`,
                );
            })
    };

    public readonly insert = (body: FormDataCM): Promise<FormDataVM> => {
        return this.repository.useHTTP().save(body as any)
            .then(async (model) => {
                const formGroup = await this.formGroupRepository.useHTTP().findOne(body.formGroupId);
                const processStepInstance = await this.processStepInstanceRepository.useHTTP().findOne(body.wFStepInstanceId);
                await this.repository.useHTTP().save({...model, formGroup: formGroup, wFStepInstance: processStepInstance})
                return await this.findById(model.id);
            })
    };

    public readonly update = async (body: FormDataUM): Promise<FormDataVM> => {
        return await this.repository.useHTTP().findOne({ id: body.id })
            .then(async (model) => {
                if (!model) {
                    throw new NotFoundException(
                        `Can not find ${body.id}`,
                    );
                }
                return await this.repository.useHTTP()
                    .save(body)
                    .then(() => {
                        return this.findById(body.id);
                    })
            });
    };

    public readonly remove = async (id: string): Promise<FormDataVM> => {
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

    public readonly active = async (id: string): Promise<FormDataVM> => {
        return await this.repository.useHTTP().findOne({ id: id })
            .then(async (model) => {
                if (!model) {
                    throw new NotFoundException(
                        `Can not find ${id}`,
                    );
                }
                return await this.repository.useHTTP()
                    .save({ ...model, isDelete: false })
                    .then(() => {
                        return this.findById(model.id);
                    })
            });
    };

    public readonly deactive = async (id: string): Promise<FormDataVM> => {
        return await this.repository.useHTTP().findOne({ id: id })
            .then(async (model) => {
                if (!model) {
                    throw new NotFoundException(
                        `Can not find ${id}`,
                    );
                }
                return await this.repository.useHTTP()
                    .save({ ...model, isDelete: true })
                    .then(() => {
                        return this.findById(model.id);
                    })
            });
    };
}