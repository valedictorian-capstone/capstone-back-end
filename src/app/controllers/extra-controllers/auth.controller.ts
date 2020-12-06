import { Body, Controller, Post, Put, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AccountVM, CustomerCM, CustomerVM, DeviceCM } from '@view-models';
import { AuthService } from '@services';

class LoginGM {
  @ApiProperty({ required: true })
  public readonly emailOrPhone: string;
  @ApiProperty({ required: true })
  public readonly password: string;
}
class LoginCustomerGM {
  @ApiProperty({ required: true })
  public readonly phone: string;
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
  public async auth(@Request() req: Request, @Body() device: DeviceCM): Promise<AccountVM> {
    const token = req.headers['authorization'];
    return this.authenService.refresh(token, device);
  }

  @Put('/Customer')
  @ApiOperation({ summary: 'Authorized' })
  @ApiOkResponse({ description: 'Authorized' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async authCustomer(@Request() req: Request, @Body() device: DeviceCM): Promise<CustomerVM> {
    const token = req.headers['authorization'];
    return this.authenService.refreshCustomer(token, device);
  }

  @Put('/password')
  @ApiOperation({ summary: 'Change password' })
  @ApiOkResponse({ description: 'Change password' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async updatePassword(@Request() req: Request, @Body() data: { password: string }): Promise<AccountVM> {
    const token = req.headers['authorization'];
    return this.authenService.updatePassword(data, token);
  }

  @Put('/profile')
  @ApiOperation({ summary: 'Authorized' })
  @ApiOkResponse({ description: 'Authorized' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async updateProfile(@Request() req: Request, @Body() account: AccountVM): Promise<AccountVM> {
    const token = req.headers['authorization'];
    return this.authenService.updateProfile(account, token);
  }

  @Put('/Customer/profile')
  @ApiOperation({ summary: 'Authorized' })
  @ApiOkResponse({ description: 'Authorized' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async updateCustomerProfile(@Request() req: Request, @Body() customer: CustomerVM): Promise<CustomerVM> {
    const token = req.headers['authorization'];
    return this.authenService.updateCustomerProfile(customer, token);
  }

  @Post('/Login')
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ description: 'Login Success' })
  @ApiBadRequestResponse({ description: 'Login Fail' })
  public login(@Body() body: LoginGM): any {
    return this.authenService.login(body.emailOrPhone, body.password);
  }
  @Post('/Customer/register')
  @ApiOperation({ summary: 'Register' })
  @ApiCreatedResponse({ description: 'Register Success' })
  @ApiBadRequestResponse({ description: 'Register Fail' })
  public registerCustomer(@Body() body: CustomerCM): any {
    return this.authenService.registerCustomer(body);
  }
  @Post('/Customer/login')
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ description: 'Login Success' })
  @ApiBadRequestResponse({ description: 'Login Fail' })
  public loginCustomer(@Body() body: LoginCustomerGM): any {
    return this.authenService.loginCustomer(body.phone);
  }
}
