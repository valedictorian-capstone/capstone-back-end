import { Account } from '@models';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountRepository } from '@repositories';
import { ACCOUNT_REPOSITORY } from '@types';
import { AccountVM } from '@view-models';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService,
    @InjectMapper() protected readonly mapper: AutoMapper,
  ) { }

  public readonly login = async (emailOrPhone: string, password: string): Promise<any> => {
    return await this.validateAccount(emailOrPhone, password).then(
      async (account) => {
        if (account) {
          return {
            expiresIn: '24h',
            accessToken: this.generateJWT(account),
            roles: account.roles.map((e) => e.name),
            fullname: account.fullname,
            avatar: account.avatar,
            id: account.id,
          };
        }
      }
    )
  }

  private generateJWT(account: AccountVM): string {
    return sign({ account }, 'vzicqoasanQhtZicTmeGsBpacNomny', {
      expiresIn: '24h',
      audience: account.email,
      issuer: 'crm',
      subject: 'se20fa27'
    });
  }

  private comparePasswords(newPassword: string, passwordHash: string): Observable<any> {
    return of<any | boolean>(compare(newPassword, passwordHash));
  }

  private validateAccount = async (emailOrPhone: string, password: string): Promise<AccountVM> => {
    const option = isNaN(+emailOrPhone) ?
      { email: emailOrPhone }
      : { phone: emailOrPhone }
    return await this.accountRepository.useHTTP().findOne({ where: { ...option }, relations: ["roles", "accountDepartments", "tasks"] }).then(
      account => {
        if (!account) {
          throw new UnauthorizedException("Invalid email or phone", "Invalid email or phone");
        }
        this.comparePasswords(password, account?.password).pipe(
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
