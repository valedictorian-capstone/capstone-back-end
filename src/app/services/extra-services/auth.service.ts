import { Account } from '@models';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountRepository } from '@repositories';
import { ACCOUNT_REPOSITORY } from '@types';
import { compare, hashSync } from 'bcrypt';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService
  ) { }

  public readonly login = async (emailOrPhone: string, password: string): Promise<string> => {
    return await this.validateAccount(emailOrPhone, password).then(
      account => {
        if (account) {
          return this.generateJWT(account).toPromise();
        }
      }
    ) 
  }

  private generateJWT(account: Account): Observable<string> {
    return from(this.jwtService.signAsync({account}))
  }

  private comparePasswords(newPassword: string, passwordHash: string): Observable <any> {
    return of<any | boolean>(compare(newPassword, passwordHash));
  }

  private validateAccount = async (emailOrPhone: string, password: string): Promise<Account> => {
    const option = isNaN(+emailOrPhone) ?
      { email: emailOrPhone, password: password }
      : { phone: emailOrPhone, password: password }
    return await this.accountRepository.useHTTP().findOne(option).then(
      account => {
        this.comparePasswords(password, account.password).pipe(
          map((match:boolean) => {
            if(!match) {
              throw new UnauthorizedException({},"Invalid Password");
            }
          })
        )
        return account;
      }
    )
    
  }
}
