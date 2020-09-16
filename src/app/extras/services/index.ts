import { CRMRepository } from 'src/app/extras/repositories';
import { Model, Repository, Sequelize } from "sequelize-typescript";
import { WhereOptions } from "sequelize/types";

export abstract class CRMService<T extends Model> {

    constructor(protected readonly model: new () => T, protected readonly sequelize: Sequelize) {}

    public readonly findAll = (expression: WhereOptions, models: Array<Repository<Model>>): Promise<T[]> => {
        return this.initRepository().findAll(expression, models);
    }

    public readonly findById = (expression: WhereOptions, models: Array<Repository<Model>>): Promise<T> => {
        return this.initRepository().findById(expression, models);
    }

    public readonly insert = (data: T): Promise<T> => {
        return this.initRepository().insert(data);
    }

    public readonly update = (data: T, obj: { [key: string]: string }): Promise<[number, T[]]> => {
        return this.initRepository().update(data, obj);
    }

    public readonly remove = (obj: { [key: string]: string }): Promise<number> => {
        return this.initRepository().remove(obj);
    }

    public readonly getRepository = (): Repository<T> => {
        return this.sequelize.getRepository(this.model);
    }

    public abstract initRepository(): CRMRepository<T>;
}
