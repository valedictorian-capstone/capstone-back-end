import { FormControl } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FormControlRepository } from '@repositories';
import { FORM_CONTROL_REPOSITORY } from '@types';
import { FormControlCM, FormControlUM, FormControlVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { NotFoundException } from '@exceptions';

@Injectable()
export class FormControlService {

    constructor(
        @Inject(FORM_CONTROL_REPOSITORY) protected readonly repository: FormControlRepository,
        @InjectMapper() protected readonly mapper: AutoMapper
    ) { }

    public readonly findAll = async (): Promise<FormControlVM[]> => {
        return await this.repository.useHTTP().find()
            .then((models) => this.mapper.mapArray(models, FormControlVM, FormControl))
    };

    public readonly findById = async (id: string): Promise<FormControlVM> => {
        return await this.repository.useHTTP().findOne(id)
            .then((model) => {
                console.log(model)
                if (model) {
                    return this.mapper.map(model, FormControlVM, FormControl);
                }
                throw new NotFoundException(
                    `Error at [FormControlService] [findById function] with [message]: Can not find ${id}`,
                );
            })
    };

    public readonly insert = (body: FormControlCM): Promise<FormControlVM> => {
        return this.repository.useHTTP().insert(body as any)
            .then((model) => (this.mapper.map(model, FormControlVM, FormControl as any)))
    };

    public readonly update = async (body: FormControlUM): Promise<FormControlVM> => {
        return await this.repository.useHTTP().findOne(body.id)
            .then(async () => {
                return await this.repository.useHTTP()
                    .save(body as any)
                    .then(() => (this.mapper.map(body, FormControlVM, FormControlUM)))
            });
    };

    public readonly remove = async (id: string): Promise<FormControlVM> => {
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

    public readonly active = async (id: string): Promise<FormControlVM> => {
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

    public readonly deactive = async (id: string): Promise<FormControlVM> => {
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