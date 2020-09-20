import { FormGroup } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FormGroupRepository } from '@repositories';
import { FORM_GROUP_REPOSITORY } from '@types';
import { FormGroupCM, FormGroupUM, FormGroupVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { NotFoundException } from '@exceptions';

@Injectable()
export class FormGroupService {

    constructor(
        @Inject(FORM_GROUP_REPOSITORY) protected readonly repository: FormGroupRepository,
        @InjectMapper() protected readonly mapper: AutoMapper
    ) { }

    public readonly findAll = async (): Promise<FormGroupVM[]> => {
        return await this.repository.useHTTP().find()
            .then((models) => this.mapper.mapArray(models, FormGroupVM, FormGroup))
    };

    public readonly findById = async (id: string): Promise<FormGroupVM> => {
        return await this.repository.useHTTP().findOne(id)
            .then((model) => {
                console.log(model)
                if (model) {
                    return this.mapper.map(model, FormGroupVM, FormGroup);
                }
                throw new NotFoundException(
                    `Error at [FormGroupService] [findById function] with [message]: Can not find ${id}`,
                );
            })
    };

    public readonly insert = (body: FormGroupCM): Promise<FormGroupVM> => {
        return this.repository.useHTTP().insert(body as any)
            .then((model) => (this.mapper.map(model, FormGroupVM, FormGroup as any)))
    };

    public readonly update = async (body: FormGroupUM): Promise<FormGroupVM> => {
        return await this.repository.useHTTP().findOne(body.id)
            .then(async () => {
                return await this.repository.useHTTP()
                    .save(body as any)
                    .then(() => (this.mapper.map(body, FormGroupVM, FormGroupUM)))
            });
    };

    public readonly remove = async (id: string): Promise<FormGroupVM> => {
        return await this.repository.useHTTP().findOne(id)
            .then(async (model) => {
                return await this.repository.useHTTP()
                    .remove(model)
                    .then(() => {
                        throw new HttpException(
                            `Remove information of ${id} successfully !!!`,
                            HttpStatus.CREATED,
                        );
                    })
            });
    };

    public readonly active = async (id: string): Promise<FormGroupVM> => {
        return await this.repository.useHTTP().findOne(id)
            .then(async (model) => {
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
        return await this.repository.useHTTP().findOne(id)
            .then(async (model) => {
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