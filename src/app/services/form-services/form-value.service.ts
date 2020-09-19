import { FormValue } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FormValueRepository } from '@repositories';
import { FORM_VALUE_REPOSITORY } from '@types';
import { FormValueCM, FormValueUM, FormValueVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { NotFoundException } from '@exceptions';

@Injectable()
export class FormValueService {

    constructor(
        @Inject(FORM_VALUE_REPOSITORY) protected readonly repository: FormValueRepository,
        @InjectMapper() protected readonly mapper: AutoMapper
    ) { }

    public readonly findAll = async (): Promise<FormValueVM[]> => {
        return await this.repository.useHTTP().find()
            .then((models) => this.mapper.mapArray(models, FormValueVM, FormValue))
    };

    public readonly findById = async (id: string): Promise<FormValueVM> => {
        return await this.repository.useHTTP().findOne(id)
            .then((model) => {
                console.log(model)
                if (model) {
                    return this.mapper.map(model, FormValueVM, FormValue);
                }
                throw new NotFoundException(
                    `Error at [FormValueService] [findById function] with [message]: Can not find ${id}`,
                );
            })
    };

    public readonly insert = (body: FormValueCM): Promise<FormValueVM> => {
        return this.repository.useHTTP().insert(body as any)
            .then((model) => (this.mapper.map(model, FormValueVM, FormValue as any)))
    };

    public readonly update = async (body: FormValueUM): Promise<FormValueVM> => {
        return await this.repository.useHTTP().findOne(body.id)
            .then(async () => {
                return await this.repository.useHTTP()
                    .save(body as any)
                    .then(() => (this.mapper.map(body, FormValueVM, FormValueUM)))
            });
    };

    public readonly remove = async (id: string): Promise<FormValueVM> => {
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

    public readonly active = async (id: string): Promise<FormValueVM> => {
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

    public readonly deactive = async (id: string): Promise<FormValueVM> => {
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