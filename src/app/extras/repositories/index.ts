import { Model, Repository, Sequelize } from "sequelize-typescript";
import { WhereOptions } from "sequelize/types";

export class CRMRepository<T extends Model> {

    private repository: Repository<T>;
    constructor(protected readonly model: new () => T, protected readonly sequelize: Sequelize) {
        this.repository = sequelize.getRepository(model);
    }
    public readonly insert = (data: T): Promise<T> => {
        return this.repository.create(data);
    }
    public readonly update = (data: T, obj: { [key: string]: string }): Promise<[number, T[]]> => {
        return this.repository.update(data, { where: obj });
    }
    public readonly remove = (obj: { [key: string]: string }): Promise<number> => {
        return this.repository.destroy({ where: obj });
    }
    public readonly findById = (expression: WhereOptions, models: Array<Repository<Model>>): Promise<T> => {
        return this.repository.findOne({ where: expression, include: models });
    }
    public readonly findAll = (expression: WhereOptions, models: Array<Repository<Model>>): Promise<T[]> => {
        return this.repository.findAll({ include: models, where: expression });
    }
}
