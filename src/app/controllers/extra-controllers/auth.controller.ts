import { Body, Controller, Post, Put, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AccountVM, DeviceCM } from '@view-models';
import { AuthService } from '@services';

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

  @Put()
  @ApiOperation({ summary: 'Authorized' })
  @ApiOkResponse({ description: 'Authorized' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async auth(@Request() req: any, @Body() device: DeviceCM): Promise<AccountVM> {
    const token = req.headers.authorization;
    return this.authenService.refresh(token, device);
  }

  @Put('/password')
  @ApiOperation({ summary: 'Change password' })
  @ApiOkResponse({ description: 'Change password' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async updatePassword(@Request() req: any, @Body() data: { password: string }): Promise<AccountVM> {
    const token = req.headers.authorization;
    return this.authenService.updatePassword(data, token);
  }

  @Put('/profile')
  @ApiOperation({ summary: 'Authorized' })
  @ApiOkResponse({ description: 'Authorized' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async updateProfile(@Request() req: any, @Body() account: AccountVM): Promise<AccountVM> {
    const token = req.headers.authorization;
    return this.authenService.updateProfile(account, token);
  }

  @Post('/Login')
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ description: 'Login Success' })
  @ApiBadRequestResponse({ description: 'Login Fail' })
  public login(@Body() body: LoginGM): any {
    return this.authenService.login(body.emailOrPhone, body.password);
  }

}
