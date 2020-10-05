import { FormData } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FormDataRepository } from '@repositories';
import { FORM_DATA_REPOSITORY } from '@types';
import { FormDataCM, FormDataUM, FormDataVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { NotFoundException } from '@exceptions';
import { In } from 'typeorm';

@Injectable()
export class FormDataService {

    constructor(
        @Inject(FORM_DATA_REPOSITORY) protected readonly repository: FormDataRepository,
        @InjectMapper() protected readonly mapper: AutoMapper
    ) { }

    public readonly findAll = async (ids?: string[]): Promise<FormDataVM[]> => {
        return await this.repository.useHTTP().find(ids ? { id: In(ids) } : {})
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

    public readonly insert = (body: FormDataCM): Promise<FormDataVM[]> => {
        return this.repository.useHTTP().save(body as any)
            .then((model) => {
                const ids = [];
                ids.push(model.id);
                return this.findAll(ids);
            })
    };

    public readonly update = async (body: FormDataUM): Promise<FormDataVM[]> => {
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
                        const ids = [];
                        ids.push(model.id);
                        return this.findAll(ids);
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

    public readonly active = async (id: string): Promise<FormDataVM[]> => {
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
                        const ids = [];
                        ids.push(model.id);
                        return this.findAll(ids);
                    })
            });
    };

    public readonly deactive = async (id: string): Promise<FormDataVM[]> => {
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
                        const ids = [];
                        ids.push(model.id);
                        return this.findAll(ids);
                    })
            });
    };
}