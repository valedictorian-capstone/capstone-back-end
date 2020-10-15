import { NotFoundException } from '@exceptions';
import { ExtraInformation } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ExtraInformationRepository } from '@repositories';
import { EXTRA_INFORMATION_REPOSITORY } from '@types';
import { ExtraInformationUM, ExtraInformationVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class ExtraInformationService {
    constructor(
        @Inject(EXTRA_INFORMATION_REPOSITORY) protected readonly repository: ExtraInformationRepository,
        @InjectMapper() protected readonly mapper: AutoMapper
    ) { }

    public readonly findAll = async (ids?: string[]): Promise<ExtraInformationVM[]> => {
        return await this.repository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: ["customerExtraInformationDatas", "accountExtraInformationDatas", "productExtraInformationDatas"] })
            .then((models) => this.mapper.mapArray(models, ExtraInformationVM, ExtraInformation))
    };

    public readonly findById = async (id: string): Promise<ExtraInformationVM> => {
        return await this.repository.useHTTP().findOne({ where: { id: id }, relations: ["customerExtraInformationDatas", "accountExtraInformationDatas", "productExtraInformationDatas"] })
            .then((model) => {
                if (model) {
                    return this.mapper.map(model, ExtraInformationVM, ExtraInformation);
                }
                throw new NotFoundException(
                    `Can not find ${id}`,
                );
            })
    };

    public readonly insert = (body: ExtraInformationUM[]): Promise<ExtraInformationVM[]> => {
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
    public readonly update = async (body: ExtraInformationUM[]): Promise<ExtraInformationVM[]> => {
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

    public readonly remove = async (id: string): Promise<ExtraInformationVM> => {
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

    public readonly active = async (id: string): Promise<ExtraInformationVM[]> => {
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

    public readonly deactive = async (id: string): Promise<ExtraInformationVM[]> => {
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
