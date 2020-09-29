import { AccountExtraInformation } from '@models';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AccountExtraInformationRepository } from '@repositories';
import { ACCOUNT_EXTRA_INFORMATION_REPOSITORY } from '@types';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { AccountExtraInformationCM, AccountExtraInformationUM, AccountExtraInformationVM } from 'src/app/view-models';
@Injectable()
export class AccountExtraInformationService {

  constructor(
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(ACCOUNT_EXTRA_INFORMATION_REPOSITORY) protected readonly repository: AccountExtraInformationRepository
  ) { }

  public readonly findAll = async (): Promise<AccountExtraInformationVM[]> => {
    return await this.repository.useHTTP().find()
      .then((models) => this.mapper.mapArray(models, AccountExtraInformationVM, AccountExtraInformation))
  };

  public readonly findById = async (id: string): Promise<AccountExtraInformationVM> => {
    return await this.repository.useHTTP().findOne({id: id})
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

  public readonly insert = (body: AccountExtraInformationCM): Promise<AccountExtraInformationVM> => {
    return this.repository.useHTTP().save(body as any)
      .then((model) => {
        return this.mapper.map(model, AccountExtraInformationVM, AccountExtraInformation)}).catch()
  };

  public readonly update = async (body: AccountExtraInformationUM): Promise<AccountExtraInformationVM> => {
    return await this.repository.useHTTP().findOne({id: body.id})
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body as any)
          .then((model) => (this.mapper.map(model, AccountExtraInformationVM, AccountExtraInformation)))
          .catch()
      });
  };

  public readonly remove = async (id: string): Promise<AccountExtraInformationVM> => {
    return await this.repository.useHTTP().findOne({id: id})
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

  public readonly active = async (id: string): Promise<AccountExtraInformationVM> => {
    return await this.repository.useHTTP().findOne({id: id})
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then(() => {
            throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
      });
  };

  public readonly deactive = async (id: string): Promise<AccountExtraInformationVM> => {
    return await this.repository.useHTTP().findOne({id: id})
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then(() => {
            throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
      });
  };
}
