import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AccountRepository, RoleRepository } from '../repositories/account-repositories';
import { ACCOUNT_REPOSITORY, ROLE_REPOSITORY } from '../types/account-types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @Inject(ROLE_REPOSITORY) protected readonly roleRepository: RoleRepository,
  ) { }
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException("You have no permission");
    }
    try {
      const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
      const account = Object.assign(decoded.valueOf()).account;
      if (account) {
        next();
      }
      throw new UnauthorizedException("Your email does not existed");

    } catch {
      throw new UnauthorizedException("You have no permission");
    }
  }
}
