import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthCustomerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    console.log('customer', token);
    if (!token) {
      throw new UnauthorizedException("You have no permission");
    }
    try {
      const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
      const customer = Object.assign(decoded.valueOf()).customer;
      if (customer) {
        next();
        return;
      }
      throw new UnauthorizedException("Your email does not existed");

    } catch {
      throw new UnauthorizedException("You have no permission");
    }
  }
}
