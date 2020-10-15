import { NotFoundException } from '@exceptions';
import { CustomerExtraInformation } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerExtraInformationRepository } from '@repositories';
import { CUSTOMER_EXTRA_INFORMATION_REPOSITORY } from '@types';
import { CustomerExtraInformationUM, CustomerExtraInformationVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class CustomerExtraInformationService {
    constructor(
        @Inject(CUSTOMER_EXTRA_INFORMATION_REPOSITORY) protected readonly repository: CustomerExtraInformationRepository,
        @InjectMapper() protected readonly mapper: AutoMapper
    ) { }

    public readonly findAll = async (ids?: string[]): Promise<CustomerExtraInformationVM[]> => {
        return await this.repository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: ["customerExtraInformationDatas"] })
            .then((models) => this.mapper.mapArray(models, CustomerExtraInformationVM, CustomerExtraInformation))
    };

    public readonly findById = async (id: string): Promise<CustomerExtraInformationVM> => {
        return await this.repository.useHTTP().findOne({ where: { id: id }, relations: ["customerExtraInformationDatas"] })
            .then((model) => {
                if (model) {
                    return this.mapper.map(model, CustomerExtraInformationVM, CustomerExtraInformation);
                }
                throw new NotFoundException(
                    `Can not find ${id}`,
                );
            })
    };

    public readonly insert = (body: CustomerExtraInformationUM[]): Promise<CustomerExtraInformationVM[]> => {
        return this.repository.useHTTP().save(body)
            .then(
                (models) => {
                    console.log(models)
                    const ids = [];
                    models.map(model => ids.push(model.id));
                    return this.findAll(ids);
                }
            )
    };
    public readonly update = async (body: CustomerExtraInformationUM[]): Promise<CustomerExtraInformationVM[]> => {
        return this.repository.useHTTP().save(body)
            .then(
                (models) => {
                    console.log(models)
                    const ids = [];
                    models.map(model => ids.push(model.id));
                    return this.findAll(ids);
                }
            )
    };

    public readonly remove = async (id: string): Promise<CustomerExtraInformationVM> => {
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

    public readonly active = async (id: string): Promise<CustomerExtraInformationVM[]> => {
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

    public readonly deactive = async (id: string): Promise<CustomerExtraInformationVM[]> => {
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
