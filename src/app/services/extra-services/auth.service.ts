import { Account } from '@models';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountRepository, DeviceRepository } from '@repositories';
import { ACCOUNT_REPOSITORY, DEVICE_REPOSITORY } from '@types';
import { AccountVM, DeviceCM } from '@view-models';
import { compare, hashSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @Inject(DEVICE_REPOSITORY) protected readonly deviceRepository: DeviceRepository,
    private readonly jwtService: JwtService,
    @InjectMapper() protected readonly mapper: AutoMapper,
  ) { }

  public readonly login = async (emailOrPhone: string, password: string,): Promise<any> => {
    return await this.validateAccount(emailOrPhone, password).then(
      async (account) => {
        if (account) {
          return {
            expiresIn: '24h',
            accessToken: this.generateJWT(account),
            roles: account.roles,
            fullname: account.fullname,
            avatar: account.avatar,
            id: account.id,
          };
        }
      }
    )
  }
  public readonly refresh = async (token: string, device: DeviceCM) => {
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    const account = Object.assign(decoded.valueOf()).account;
    const exist = await this.deviceRepository.useHTTP().findOne({ id: device?.id, account: account });
    if (device.id && !exist) {
      await this.deviceRepository.useHTTP().insert({ ...device, account: account, customer: undefined });
      return { ...account, devices: [...account.devices, device] };
    }
    return account;
  }
  protected readonly generateJWT = (account: AccountVM): string => {
    return sign({ account }, 'vzicqoasanQhtZicTmeGsBpacNomny', {
      expiresIn: '24h',
      audience: account.email,
      issuer: 'crm',
      subject: 'se20fa27'
    });
  }
  public readonly updatePassword = async (data: { password: string }, token: string) => {
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    const account = Object.assign(decoded.valueOf()).account;
    return await this.accountRepository.useHTTP().save({ id: account.id, passwordHash: hashSync(data.password, 10) } as any).then(() => null);
  }
  public readonly updateProfile = async (data: AccountVM, token: string) => {
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    const account = Object.assign(decoded.valueOf()).account;
    return await this.accountRepository.useHTTP().save({ ...data, id: account.id } as any).then(() => ({ ...data }));
  }
  protected readonly comparePasswords = (newPassword: string, passwordHash: string): Observable<any> => {
    return of<any | boolean>(compare(newPassword, passwordHash));
  }
  protected readonly validateAccount = async (emailOrPhone: string, password: string): Promise<AccountVM> => {
    const option = isNaN(+emailOrPhone) ?
      { email: emailOrPhone }
      : { phone: emailOrPhone }
    return await this.accountRepository.useHTTP().findOne({ where: { ...option }, relations: ["roles", "activitys", "devices"] }).then(
      async account => {
        if (!account) {
          throw new UnauthorizedException("Invalid email or phone", "Invalid email or phone");
        }
        this.comparePasswords(password, account?.passwordHash).pipe(
          map((match: boolean) => {
            if (!match) {
              throw new UnauthorizedException("Invalid Password", "Invalid Password");
            }
          })
        )
        return this.mapper.map(account, AccountVM, Account);
      }
    )
  }
}
