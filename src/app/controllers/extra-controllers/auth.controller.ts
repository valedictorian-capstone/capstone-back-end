import { Body, Controller, Headers, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@services';
import { AccountVM, CustomerCM, CustomerVM, DeviceCM } from '@view-models';

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
  public async auth(@Headers('requester') requester: AccountVM, @Body() device: DeviceCM): Promise<AccountVM> {
    return this.authenService.refresh(requester, device);
  }

  @Put('/Customer')
  @ApiOperation({ summary: 'Authorized' })
  @ApiOkResponse({ description: 'Authorized' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async authCustomer(@Headers('requester') requester: CustomerVM, @Body() device: DeviceCM): Promise<CustomerVM> {
    return this.authenService.refreshCustomer(requester, device);
  }

  @Put('/password')
  @ApiOperation({ summary: 'Change password' })
  @ApiOkResponse({ description: 'Change password' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async updatePassword(@Headers('requester') requester: AccountVM, @Body() data: { password: string, old: string }): Promise<AccountVM> {
    return this.authenService.updatePassword(data, requester);
  }

  @Put('/profile')
  @ApiOperation({ summary: 'Authorized' })
  @ApiOkResponse({ description: 'Authorized' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async updateProfile(@Headers('requester') requester: AccountVM, @Body() account: AccountVM): Promise<AccountVM> {
    return this.authenService.updateProfile(account, requester);
  }

  @Put('/Customer/profile')
  @ApiOperation({ summary: 'Authorized' })
  @ApiOkResponse({ description: 'Authorized' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async updateCustomerProfile(@Headers('requester') requester: CustomerVM, customer: CustomerVM): Promise<CustomerVM> {
    return this.authenService.updateCustomerProfile(customer, requester);
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
