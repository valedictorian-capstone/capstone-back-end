import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/app/services/extra-services/auth.service';

@Controller()
@ApiBearerAuth('JWT')
@ApiTags('Authentication')
@Controller('/api/v1/zxc')
export class AuthController {
  constructor(
    protected authenService: AuthService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ description: 'Login Success' })
  @ApiBadRequestResponse({ description: 'Login Fail' })
  public insert(@Body() body: { emailOrPhone: string, password:string }): Promise<string> {
    return this.authenService.login(body.emailOrPhone, body.password);
  }

}
