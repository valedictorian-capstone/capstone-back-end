import { AccountExtraInformation } from '@models';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AccountExtraInformationRepository } from '@repositories';
import { ACCOUNT_EXTRA_INFORMATION_REPOSITORY } from '@types';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { AccountExtraInformationUM, AccountExtraInformationVM } from 'src/app/view-models';
import { In } from 'typeorm';
@Injectable()
export class AccountExtraInformationService {

  constructor(
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(ACCOUNT_EXTRA_INFORMATION_REPOSITORY) protected readonly repository: AccountExtraInformationRepository
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<AccountExtraInformationVM[]> => {
    return await this.repository.useHTTP().find(ids ? { id: In(ids)} : {})
      .then((models) => this.mapper.mapArray(models, AccountExtraInformationVM, AccountExtraInformation))
  };

  public readonly findById = async (id: string): Promise<AccountExtraInformationVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model !== null) {
          return this.mapper.map(model, AccountExtraInformationVM, AccountExtraInformation);
        }
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
      })
  };

  public readonly insert = (body: AccountExtraInformationUM[]): Promise<any> => {
    return this.repository.useHTTP().save(body).then(
      (models) => {
        console.log(models)
        const ids = [];
        models.map(model => ids.push(model.id));
        return this.findAll(ids);
      }
    )
  };
}
