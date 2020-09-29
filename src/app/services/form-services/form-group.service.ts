import { FormGroup } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FormControlRepository, FormGroupRepository } from '@repositories';
import { FORM_CONTROL_REPOSITORY, FORM_GROUP_REPOSITORY } from '@types';
import { FormGroupCM, FormGroupUM, FormGroupVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { NotFoundException } from '@exceptions';

@Injectable()
export class FormGroupService {

    constructor(
        @Inject(FORM_GROUP_REPOSITORY) protected readonly repository: FormGroupRepository,
        @Inject(FORM_CONTROL_REPOSITORY) protected readonly controlRepository: FormControlRepository,
        @InjectMapper() protected readonly mapper: AutoMapper
    ) { }

    public readonly findAll = async (): Promise<FormGroupVM[]> => {
        return await this.repository.useHTTP().find({relations: ["formControls"]})
            .then((models) => this.mapper.mapArray(models, FormGroupVM, FormGroup))
    };

    public readonly findById = async (id: string): Promise<FormGroupVM> => {
        return await this.repository.useHTTP().findOne({ id: id })
            .then((model) => {
                if (model) {
                    return this.mapper.map(model, FormGroupVM, FormGroup);
                }
                throw new NotFoundException(
                    `Can not find ${id}`,
                );
            })
    };

    public readonly insert = (body: FormGroupCM): Promise<FormGroupVM> => {
        return this.repository.useHTTP().insert(body)
            .then((model) => {
                this.controlRepository.useHTTP().insert(body.formControls.map(formControl => ({...formControl, formGroup: model.generatedMaps[0]})));
                (this.mapper.map(model, FormGroupVM, FormGroup as any));
            })
            .catch((err) =>{console.log(err); return null});
    };

    public readonly update = async (body: FormGroupUM): Promise<FormGroupVM> => {
        return await this.repository.useHTTP().findOne({ id: body.id })
            .then(async (model) => {
                if (!model) {
                    throw new NotFoundException(
                        `Can not find ${body.id}`,
                    );
                }
                return await this.repository.useHTTP()
                    .save(body)
                    .then(() => (this.mapper.map(body, FormGroupVM, FormGroupUM)))
            });
    };

    public readonly remove = async (id: string): Promise<FormGroupVM> => {
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

    public readonly active = async (id: string): Promise<FormGroupVM> => {
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
                        throw new HttpException(
                            `Update information of ${id} successfully !!!`,
                            HttpStatus.CREATED,
                        );
                    })
            });
    };

    public readonly deactive = async (id: string): Promise<FormGroupVM> => {
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
                        throw new HttpException(
                            `Update information of ${id} successfully !!!`,
                            HttpStatus.CREATED,
                        );
                    })
            });
    };
}