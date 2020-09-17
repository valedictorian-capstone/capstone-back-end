import { Inject } from "@nestjs/common";
import { Model, Repository, Sequelize } from "sequelize-typescript";
import { WhereOptions } from "sequelize/types";

export class CRMRepository<T extends Model> {

    @Inject('SEQUELIZE')
    protected readonly sequelize: Sequelize;
    constructor(protected readonly model: new () => T) { }
    public readonly insert = (data: T): Promise<T> => {
        return this.sequelize.getRepository(this.model).create(data);
    }
    public readonly update = (data: T, obj: { [key: string]: string }): Promise<[number, T[]]> => {
        return this.sequelize.getRepository(this.model).update(data, { where: obj });
    }
    public readonly remove = (obj: { [key: string]: string }): Promise<number> => {
        return this.sequelize.getRepository(this.model).destroy({ where: obj });
    }
    public readonly findById = (expression: WhereOptions, models: Array<Repository<Model>>): Promise<T> => {
        return this.sequelize.getRepository(this.model).findOne({ where: expression, include: models });
    }
    public readonly findAll = (expression: WhereOptions, models: Array<Repository<Model>>): Promise<T[]> => {
        return this.sequelize.getRepository(this.model).findAll({ include: models, where: expression });
    }
}
