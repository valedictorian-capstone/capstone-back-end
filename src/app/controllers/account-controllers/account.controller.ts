import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
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
import { AccountCM, AccountUM, AccountVM } from '@view-models';
import { AccountService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('Account')
@Controller('/api/v1/Account')
export class AccountController {
  constructor(
    protected service: AccountService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all Accounts' })
  @ApiOkResponse({ description: 'Success return all Accounts' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<AccountVM[]> {
    return this.service.findAll();
  }

  @Get('/jwt/')
  @ApiOperation({ summary: 'Get an Account by JWT' })
  @ApiOkResponse({ description: "Success return an Account's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Account by JWT' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findByJWT(@Headers('Authorization') jwt: string): Promise<AccountVM> {
    return this.service.findByJWT(jwt);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Account by Id' })
  @ApiOkResponse({ description: "Success return an Account's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Account by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<AccountVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new Account' })
  @ApiCreatedResponse({ description: 'Success create new Account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: AccountCM): Promise<AccountVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an Account by Id' })
  @ApiCreatedResponse({ description: 'Success update new Account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: AccountUM): Promise<AccountVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Account by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<AccountVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an Account by Id' })
  @ApiCreatedResponse({ description: 'Success active new Account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<AccountVM[]> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an Account by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new Account' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<AccountVM[]> {
    return this.service.deactive(id);
  }
}
