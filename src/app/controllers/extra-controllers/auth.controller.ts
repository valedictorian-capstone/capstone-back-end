import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/app/services/extra-services/auth.service';

class LoginParam {
  @ApiProperty({ required: true })
  public readonly emailOrPhone: string;
  @ApiProperty({ required: true })
  public readonly password: string;
}

@Controller()
@ApiBearerAuth('JWT')
@ApiTags('Authentication')
@Controller('/api/v1/login')
export class AuthController {
  constructor(
    protected authenService: AuthService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ description: 'Login Success' })
  @ApiBadRequestResponse({ description: 'Login Fail' })
  public login(@Body() body: LoginParam): any {
    return this.authenService.login(body.emailOrPhone, body.password);

  }

}
