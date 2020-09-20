import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
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
import { AccountCM, AccountUM, AccountVM } from '@view-models';
import { AccountService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('Account')
@Controller('/api/v1/Account')
export class AccountController{
  constructor(
    protected service: AccountService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all accounts' })
  @ApiOkResponse({ description: 'Success return all accounts' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<AccountVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an account by Id' })
  @ApiOkResponse({ description: "Success return an account's information" })
  @ApiNotFoundResponse({ description: 'Fail to find account by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<AccountVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new account' })
  @ApiCreatedResponse({ description: 'Success create new account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: AccountCM): Promise<AccountVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an account by Id' })
  @ApiCreatedResponse({ description: 'Success update new account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: AccountUM): Promise<AccountVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an account by Id' })
  @ApiCreatedResponse({ description: 'Success delete new account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<AccountVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an account by Id' })
  @ApiCreatedResponse({ description: 'Success active new account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<AccountVM> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an account by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<AccountVM> {
    return this.service.deactive(id);
  }
}
