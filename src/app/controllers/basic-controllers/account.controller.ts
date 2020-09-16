import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Sequelize } from 'sequelize-typescript';
import { AccountCM, AccountUM, AccountVM } from 'src/app/dtos';
import { IAccountController } from 'src/app/interfaces';
import { AccountService } from 'src/app/services';

@ApiBearerAuth('JWT')
@ApiTags('Account')
@Controller('/api/v1/Account')
export class AccountController implements IAccountController {
  constructor(
    protected readonly accountService: AccountService,
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all accounts' })
  @ApiOkResponse({ description: 'Success return all accounts' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<AccountVM[]> {
    return await this.accountService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an account by Id' })
  @ApiOkResponse({ description: "Success return an account's information" })
  @ApiNotFoundResponse({ description: 'Fail to find account by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<AccountVM> {
    return await this.accountService.findById(id);
  }

  @Get(':username')
  @ApiOperation({ summary: 'Get an account by Username' })
  @ApiOkResponse({ description: "Success return an account's information" })
  @ApiNotFoundResponse({ description: 'Fail to find account by Username' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findByUsername(
    @Param('username') username: string,
  ): Promise<AccountVM> {
    return await this.accountService.findByUsername(username);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get an account by Email' })
  @ApiOkResponse({ description: "Success return an account's information" })
  @ApiNotFoundResponse({ description: 'Fail to find account by Email' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findByEmail(@Param('email') email: string): Promise<AccountVM> {
    return await this.accountService.findByEmail(email);
  }

  @Get(':phone')
  @ApiOperation({ summary: 'Get an account by Phone' })
  @ApiOkResponse({ description: "Success return an account's information" })
  @ApiNotFoundResponse({ description: 'Fail to find account by Phone' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findByPhone(@Param('phone') phone: string): Promise<AccountVM> {
    return await this.accountService.findByEmail(phone);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new account' })
  @ApiCreatedResponse({ description: 'Success create new account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: AccountCM): Promise<AccountVM> {
    return await this.accountService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an account by Id' })
  @ApiCreatedResponse({ description: 'Success update new account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: AccountUM): Promise<AccountVM> {
    return await this.accountService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an account by Id' })
  @ApiCreatedResponse({ description: 'Success delete new account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(id: string): Promise<AccountVM> {
    return await this.accountService.remove(id);
  }

  @Put('Active')
  @ApiOperation({ summary: 'Active an account by Id' })
  @ApiCreatedResponse({ description: 'Success active new account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async active(id: string): Promise<AccountVM> {
    return await this.accountService.active(id);
  }

  @Put('DeActive')
  @ApiOperation({ summary: 'Deative an account by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async deactive(id: string): Promise<AccountVM> {
    return await this.accountService.deactive(id);
  }
}
