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
import { AccountRoleCM, AccountRoleUM, AccountRoleVM } from 'src/app/dtos';
import { IAccountRoleController } from 'src/app/interfaces';
import { AccountRoleService } from 'src/app/services';

@ApiBearerAuth('JWT')
@ApiTags('AccountRole')
@Controller('/api/v1/AccountRole')
export class AccountRoleController implements IAccountRoleController {
  constructor(
    protected readonly accountRoleService: AccountRoleService,
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all accountRoles' })
  @ApiOkResponse({ description: 'Success return all accountRoles' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<AccountRoleVM[]> {
    return await this.accountRoleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an accountRole by Id' })
  @ApiOkResponse({ description: "Success return an accountRole's information" })
  @ApiNotFoundResponse({ description: 'Fail to find accountRole by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<AccountRoleVM> {
    return await this.accountRoleService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new accountRole' })
  @ApiCreatedResponse({ description: 'Success create new accountRole' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: AccountRoleCM): Promise<AccountRoleVM> {
    return await this.accountRoleService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an accountRole by Id' })
  @ApiCreatedResponse({ description: 'Success update new accountRole' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: AccountRoleUM): Promise<AccountRoleVM> {
    return await this.accountRoleService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an accountRole by Id' })
  @ApiCreatedResponse({ description: 'Success delete new accountRole' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(id: string): Promise<AccountRoleVM> {
    return await this.accountRoleService.remove(id);
  }

  @Put('Active')
  @ApiOperation({ summary: 'Active an accountRole by Id' })
  @ApiCreatedResponse({ description: 'Success active new accountRole' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async active(id: string): Promise<AccountRoleVM> {
    return await this.accountRoleService.active(id);
  }

  @Put('DeActive')
  @ApiOperation({ summary: 'Deative an accountRole by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new accountRole' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async deactive(id: string): Promise<AccountRoleVM> {
    return await this.accountRoleService.deactive(id);
  }
}
