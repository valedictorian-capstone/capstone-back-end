import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthVM } from '@view-models';

@Controller()
@ApiTags('Authentication')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() req: AuthVM): Promise<any> {
    return req.username;
  }
}