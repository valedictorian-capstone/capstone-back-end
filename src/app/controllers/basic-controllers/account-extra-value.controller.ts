import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { AccountExtraValueService } from '@services';
import { AccountExtraValueCM, AccountExtraValueUM, AccountExtraValueVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('AccountExtraValue')
@Controller('/api/v1/AccountExtraValue')
export class AccountExtraValueController {
  constructor(
    protected readonly service: AccountExtraValueService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all AccountExtraValues' })
  @ApiOkResponse({ description: 'Success return all AccountExtraValues' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<AccountExtraValueVM[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an AccountExtraValue by Id' })
  @ApiOkResponse({ description: "Success return an AccountExtraValue's information" })
  @ApiNotFoundResponse({ description: 'Fail to find AccountExtraValue by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<AccountExtraValueVM> {
    return await this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new AccountExtraValue' })
  @ApiCreatedResponse({ description: 'Success create new AccountExtraValue' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: AccountExtraValueCM): Promise<AccountExtraValueVM[]> {
    return await this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an AccountExtraValue by Id' })
  @ApiCreatedResponse({ description: 'Success update new AccountExtraValue' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: AccountExtraValueUM): Promise<AccountExtraValueVM[]> {
    return await this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an AccountExtraValue by Id' })
  @ApiCreatedResponse({ description: 'Success delete new AccountExtraValue' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<AccountExtraValueVM> {
    return await this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an AccountExtraValue by Id' })
  @ApiCreatedResponse({ description: 'Success active new AccountExtraValue' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async active(@Param('id') id: string): Promise<AccountExtraValueVM[]> {
    return await this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an AccountExtraValue by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new AccountExtraValue' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async deactive(@Param('id') id: string): Promise<AccountExtraValueVM[]> {
    return await this.service.deactive(id);
  }
}
