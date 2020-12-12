import { NotFoundException } from '@exceptions';
import { Account } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository, RoleRepository } from '@repositories';
import { ACCOUNT_REPOSITORY, FIREBASE_SERVICE, ROLE_REPOSITORY, SOCKET_SERVICE } from '@types';
import { AccountCM, AccountUM, AccountVM } from '@view-models';
import { hashSync } from 'bcrypt';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { environment } from 'src/environments/environment';
import { In } from 'typeorm';
import { uuid } from 'uuidv4';
import { EmailService, FirebaseService, SocketService } from '../extra-services';

@Injectable()
export class AccountService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @Inject(ROLE_REPOSITORY) protected readonly roleRepository: RoleRepository,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    protected readonly emailService: EmailService,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }
  public readonly findAll = async (requester?: AccountVM, ids?: string[]): Promise<AccountVM[]> => {
    const level = requester ? Math.min(...requester.roles.map((e) => e.level)) : undefined;
    const queryId = ids ? {
      id: In(ids)
    } : {};
    return await this.mapper.mapArray(await this.accountRepository.useHTTP()
      .find({ where: { ...queryId }, relations: ["devices", "roles", "activitys"] }), AccountVM, Account)
      .filter((account) => level != null && account.id !== requester?.id ? Math.min(...account.roles.map((e) => e.level)) > level : true);
  };
  public readonly findById = async (id: string): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().findOne({ where: { id: id }, relations: ["devices", "roles", "activitys"] })
      .then(async (model) => {
        if (model) {
          return this.mapper.map(model, AccountVM, Account);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };
  public readonly checkUnique = async (label: string, value: string): Promise<boolean> => {
    const query = { [label]: value };
    return this.accountRepository.useHTTP().findOne({ where: query })
      .then((model) => {
        return model ? true : false;
      })
  }
  public readonly import = async (body: AccountCM[]): Promise<any> => {
    for (const account of body) {
      if (account.avatar && account.avatar.includes(';base64')) {
        account.avatar = this.solveImage(account.avatar) as any;
      }
    }
    return await this.accountRepository.useHTTP().save(body as any).then(async (accounts: Account[]) => {
      for (const acc of body) {
        await this.emailService.sendManualEmailCustomer({
          info: acc as any,
          subject: 'EMPLOYEE ACCOUNT FOR SYSTEM',
          content: '<span>Email: </span> ' + acc.email + '<br>' +
            '<span>Password: </span> ' + acc.password
        });
      }
      const rs = await this.findAll(undefined, accounts.map((e) => e.id));
      this.socketService.with('accounts', rs, 'list');
      return rs;
    });
  };
  public readonly insert = async (body: AccountCM): Promise<AccountVM> => {
    const acc = { ...body };
    if (acc.avatar && acc.avatar.includes(';base64')) {
      acc.avatar = this.solveImage(acc.avatar) as any;
    }
    return await this.accountRepository.useHTTP().save({ ...acc, passwordHash: hashSync(acc.password, 10) } as any).then(async (account) => {
      await this.emailService.sendManualEmailCustomer({
        info: account as any,
        subject: 'EMPLOYEE ACCOUNT FOR SYSTEM',
        content: '<span>Email: </span> ' + acc.email + '<br>' +
          '<span>Password: </span> ' + acc.password
      });
      const rs = await this.findById(account.id)
      this.socketService.with('accounts', rs, 'create');
      return rs;
    });
  };
  public readonly update = async (body: AccountUM): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        } else {
          const acc = { ...body };
          if (acc.avatar && acc.avatar.includes(';base64')) {
            acc.avatar = this.solveImage(acc.avatar) as any;
          }
          return await this.accountRepository.useHTTP().save(body as any).then(async (account) => {
            const rs = await this.findById(account.id)
            this.socketService.with('accounts', rs, 'update');
            return rs;
          })
        }
      });
  };
  public readonly remove = async (id: string): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.accountRepository.useHTTP()
          .save({ id, isDelete: true })
          .then(async () => {
            const rs = await this.findById(id)
            this.socketService.with('accounts', rs, 'update');
            return rs;
          })
      });
  };
  public readonly restore = async (id: string): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.accountRepository.useHTTP()
          .save({ id, isDelete: false })
          .then(async () => {
            const rs = await this.findById(id)
            this.socketService.with('accounts', rs, 'update');
            return rs;
          })
      });
  };
  private readonly solveImage = async (avatar: string) => {
    await this.firebaseService.useUploadFileBase64("employee/avatars/" + uuid() + "." + avatar.substring(avatar.indexOf("data:image/") + 11, avatar.indexOf(";base64")), avatar, avatar.substring(avatar.indexOf("data:image/") + 5, avatar.indexOf(";base64")));
    return environment.firebase.linkDownloadFile + "employee/avatars/" + uuid() + "." + avatar.substring(avatar.indexOf("data:image/") + 11, avatar.indexOf(";base64"));
  }
}
