import { FormData } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FormDataRepository } from '@repositories';
import { FORM_DATA_REPOSITORY } from '@types';
import { FormDataCM, FormDataUM, FormDataVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { NotFoundException } from '@exceptions';

@Injectable()
export class FormDataService {

    constructor(
        @Inject(FORM_DATA_REPOSITORY) protected readonly repository: FormDataRepository,
        @InjectMapper() protected readonly mapper: AutoMapper
    ) { }

    public readonly findAll = async (): Promise<FormDataVM[]> => {
        return await this.repository.useHTTP().find()
            .then((models) => this.mapper.mapArray(models, FormDataVM, FormData))
    };

    public readonly findById = async (id: string): Promise<FormDataVM> => {
        return await this.repository.useHTTP().findOne(id)
            .then((model) => {
                console.log(model)
                if (model) {
                    return this.mapper.map(model, FormDataVM, FormData);
                }
                throw new NotFoundException(
                    `Error at [FormDataService] [findById function] with [message]: Can not find ${id}`,
                );
            })
    };

    public readonly insert = (body: FormDataCM): Promise<FormDataVM> => {
        return this.repository.useHTTP().insert(body as any)
            .then((model) => (this.mapper.map(model, FormDataVM, FormData as any)))
    };

    public readonly update = async (body: FormDataUM): Promise<FormDataVM> => {
        return await this.repository.useHTTP().findOne(body.id)
            .then(async () => {
                return await this.repository.useHTTP()
                    .save(body as any)
                    .then(() => (this.mapper.map(body, FormDataVM, FormDataUM)))
            });
    };

    public readonly remove = async (id: string): Promise<FormDataVM> => {
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

    public readonly active = async (id: string): Promise<FormDataVM> => {
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

    public readonly deactive = async (id: string): Promise<FormDataVM> => {
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