import { Account } from '@models';
import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { AccountVM } from '@view-models';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { AccountRepository } from '../repositories/account-repositories';
import { ACCOUNT_REPOSITORY } from '../types/account-types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
  ) { }
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException("You have no permission");
    }
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    const account = Object.assign(decoded.valueOf()).account;
    if (!account) {
      throw new UnauthorizedException("You have no permission");
    }
    const requester = this.mapper.map(await this.accountRepository.useHTTP().findOne({ id: account.id }, { relations: ['devices', 'roles', 'notifications'] }), AccountVM, Account);
    req.headers['requester'] = requester as any;
    if (req.body) {
      if (req.body.length) {
        if (req.method === 'POST') {
          req.body.forEach(e => {
            e['createdBy'] = requester.id;
            e['updatedBy'] = requester.id;
          });
        } else if (req.method === 'PUT') {
          req.body.forEach(e => {
            e['updatedBy'] = requester.id;
            if (!e.id) {
              e['createdBy'] = requester.id;
            }
          });
        } else if (req.method === 'DELETE') {
          req.body.forEach(e => e['updatedBy'] = requester.id);
        }
      } else {
        if (req.method === 'POST') {
          req.body['createdBy'] = requester.id;
          req.body['updatedBy'] = requester.id;
        } else if (req.method === 'PUT') {
          req.body['updatedBy'] = requester.id;
          if (!req.body.id) {
            req.body['createdBy'] = requester.id;
          }
        } else if (req.method === 'DELETE') {
          req.body['updatedBy'] = requester.id;
        }
      }
    }
    next();
  }
}
