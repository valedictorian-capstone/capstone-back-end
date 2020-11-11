import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AccountVM } from '@view-models';
import { AuthService } from 'src/app/services/extra-services/auth.service';

class LoginGM {
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
    const fcmToken = req.headers.fcmtoken;
    return this.authenService.refresh(token, fcmToken);
  }

  @Post('/Login')
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ description: 'Login Success' })
  @ApiBadRequestResponse({ description: 'Login Fail' })
  public login(@Body() body: LoginGM): any {
    return this.authenService.login(body.emailOrPhone, body.password);

  }

}
