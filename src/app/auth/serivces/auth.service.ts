import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '@services';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService
  ) { }

  async validateUser(emailOrPhone: string, pass: string): Promise<any> {
    const option = {};
    if (!isNaN(+emailOrPhone)) {
      option['phone'] = emailOrPhone;
    } else{
      option['email'] = emailOrPhone;
    }
    const user = await this.accountService.findOne(option);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}