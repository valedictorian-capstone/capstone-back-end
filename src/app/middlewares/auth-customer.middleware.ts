import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { Customer } from '../models/customer-models';
import { CustomerRepository } from '../repositories/customer-repositories';
import { CUSTOMER_REPOSITORY } from '../types/customer-types';
import { CustomerVM } from '../view-models/customer-view-models';

@Injectable()
export class AuthCustomerMiddleware implements NestMiddleware {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) protected readonly customerRepository: CustomerRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
  ) { }
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException("You have no permission");
    }
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    const customer = Object.assign(decoded.valueOf()).customer;
    if (!customer) {
      throw new UnauthorizedException("You have no permission");
    }
    const requester = this.mapper.map(await this.customerRepository.useHTTP().findOne({ id: customer.id }, {relations: ['devices', 'notifications']}), CustomerVM, Customer);
    req.headers['requester'] = requester as any;
    next();
  }
}
