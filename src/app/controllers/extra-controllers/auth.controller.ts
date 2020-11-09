import { Body, Controller, Get, Request, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AccountVM } from '@view-models';
import { verify } from 'jsonwebtoken';
import { AuthService } from 'src/app/services/extra-services/auth.service';

class LoginParam {
  @ApiProperty({ required: true })
  public readonly emailOrPhone: string;
  @ApiProperty({ required: true })
  public readonly password: string;
}

@ApiBearerAuth('JWT')
@ApiTags('Auth')
@Controller('/api/v1/Auth')
export class AuthController {
  constructor(
    protected authenService: AuthService
  ) { }

  @Get()
  @ApiOperation({ summary: 'Authorized' })
  @ApiOkResponse({ description: 'Authorized' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(@Request() req: any): Promise<AccountVM> {
    const token = req.headers.authorization;
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    return await new Promise((resolve) => {
      resolve(Object.assign(decoded.valueOf()).account)
    });
  }

  @Post('/Login')
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ description: 'Login Success' })
  @ApiBadRequestResponse({ description: 'Login Fail' })
  public login(@Body() body: LoginParam): any {
    return this.authenService.login(body.emailOrPhone, body.password);

  }

}
