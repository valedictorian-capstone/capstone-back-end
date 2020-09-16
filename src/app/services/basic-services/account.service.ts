import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';
import { ACCOUNT_REPOSITORY } from 'src/app/constant';
import { AccountCM, AccountUM, AccountVM } from 'src/app/dtos';
import { AccountRole } from 'src/app/models';
import { AccountRepository } from 'src/app/repositories';

@Injectable()
export class AccountService {
  constructor(
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
  ) {}

  public readonly findAll = async (): Promise<AccountVM[]> => {
    try {
          const accounts = await this.accountRepository
              .findAll({}, []);
          return accounts.map(
              account => new AccountVM({
                  Id: account.Id,
                  Email: account.Email,
                  Fullname: account.Fullname,
                  Phone: account.Phone,
                  Username: account.Username,
                  IsDelete: account.IsDelete,
                  CreatedAt: account.CreatedAt,
                  UpdatedAt: account.UpdatedAt,
              })
          );
      } catch (e) {
          throw new HttpException(
              'Error at [AccountController] [findAll function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST
          );
      }
  };

  public readonly findById = async (id: string): Promise<AccountVM> => {
    try {
          const account = await this.accountRepository
              .findById({ Id: id }, [this.sequelize.getRepository(AccountRole)]);
          if (account !== null) {
              return new AccountVM({
                  Id: account.Id,
                  Email: account.Email,
                  Fullname: account.Fullname,
                  Phone: account.Phone,
                  Username: account.Username,
                  IsDelete: account.IsDelete,
                  CreatedAt: account.CreatedAt,
                  UpdatedAt: account.UpdatedAt,
              });
          } else {
              throw new HttpException(
                  'Can not find information of ' + id,
                  HttpStatus.NOT_FOUND
              );
          }
      } catch (e) {
          throw new HttpException(
              'Error at [AccountController] [findByUsername function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST
          );
      }
  };

  public readonly findByUsername = async (username: string): Promise<AccountVM> => {
    try {
          const account = await this.accountRepository
              .findById({ Username: username }, [
                  this.sequelize.getRepository(AccountRole),
              ]);
          if (account !== null) {
              return new AccountVM({
                  Id: account.Id,
                  Email: account.Email,
                  Fullname: account.Fullname,
                  Phone: account.Phone,
                  Username: account.Username,
                  IsDelete: account.IsDelete,
                  CreatedAt: account.CreatedAt,
                  UpdatedAt: account.UpdatedAt,
              });
          } else {
              throw new HttpException(
                  'Can not find information of ' + username,
                  HttpStatus.NOT_FOUND
              );
          }
      } catch (e) {
          throw new HttpException(
              'Error at [AccountController] [findByUsername function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST
          );
      }
  };

  public readonly findByEmail = async (email: string): Promise<AccountVM> => {
    try {
          const account = await this.accountRepository
              .findById({ Email: email }, [this.sequelize.getRepository(AccountRole)]);
          if (account !== null) {
              return new AccountVM({
                  Id: account.Id,
                  Email: account.Email,
                  Fullname: account.Fullname,
                  Phone: account.Phone,
                  Username: account.Username,
                  IsDelete: account.IsDelete,
                  CreatedAt: account.CreatedAt,
                  UpdatedAt: account.UpdatedAt,
              });
          } else {
              throw new HttpException(
                  'Can not find information of ' + email,
                  HttpStatus.NOT_FOUND
              );
          }
      } catch (e) {
          throw new HttpException(
              'Error at [AccountController] [findByEmail function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST
          );
      }
  };

  public readonly findByPhone = async (phone: string): Promise<AccountVM> => {
    try {
          const account = await this.accountRepository
              .findById({ Phone: phone }, [this.sequelize.getRepository(AccountRole)]);
          if (account !== null) {
              return new AccountVM({
                  Id: account.Id,
                  Email: account.Email,
                  Fullname: account.Fullname,
                  Phone: account.Phone,
                  Username: account.Username,
                  IsDelete: account.IsDelete,
                  CreatedAt: account.CreatedAt,
                  UpdatedAt: account.UpdatedAt,
              });
          } else {
              throw new HttpException(
                  'Can not find information of ' + phone,
                  HttpStatus.NOT_FOUND
              );
          }
      } catch (e) {
          throw new HttpException(
              'Error at [AccountController] [findByPhone function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST
          );
      }
  };

  public readonly insert = async (body: AccountCM): Promise<AccountVM> => {
    try {
          const account = await this.accountRepository
              .insert({ ...(body as any), PasswordHash: hashSync(body.Password, 10) });
          return new AccountVM({
              Id: account.Id,
              Email: account.Email,
              Fullname: account.Fullname,
              Phone: account.Phone,
              Username: account.Username,
              IsDelete: account.IsDelete,
              CreatedAt: account.CreatedAt,
              UpdatedAt: account.UpdatedAt,
          });
      } catch (e) {
          throw new HttpException(
              'Error at [AccountController] [insert function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST
          );
      }
  };

  public readonly update = async (body: AccountUM): Promise<AccountVM> => {
    try {
          await this.findById(body.Id);
          return await this.accountRepository
              .update((body as any), { Id: body.Id })
              .then(() => {
                  throw new HttpException(
                      `Update information of ${body.Id} successfully !!!`,
                      HttpStatus.CREATED
                  );
              })
              .catch(e => {
                  throw new HttpException(
                      'Error at [AccountController] [update function] with [message]: ' +
                      e.message,
                      HttpStatus.BAD_REQUEST
                  );
              });
      } catch (e_1) {
          throw new HttpException(
              'Error at [AccountController] [update function] with [message]: ' +
              e_1.message,
              HttpStatus.BAD_REQUEST
          );
      }
  };

  public readonly remove = async (id: string): Promise<AccountVM> => {
    try {
          await this.accountRepository
              .remove({ Id: id });
          throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.CREATED
          );
      } catch (e) {
          throw new HttpException(
              'Error at [AccountController] [remove function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST
          );
      }
  };

  public readonly active = async (id: string): Promise<AccountVM> => {
    try {
          await this.accountRepository
              .update(({ IsDelete: false } as any), { Id: id });
          throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED
          );
      } catch (e) {
          throw new HttpException(
              'Error at [AccountController] [active function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST
          );
      }
  };

  public readonly deactive = async (id: string): Promise<AccountVM> => {
    try {
          await this.accountRepository
              .update(({ IsDelete: true } as any), { Id: id });
          throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED
          );
      } catch (e) {
          throw new HttpException(
              'Error at [AccountController] [deactive function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST
          );
      }
  };
}
