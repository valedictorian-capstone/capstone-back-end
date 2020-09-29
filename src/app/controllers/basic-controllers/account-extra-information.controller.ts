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
import { AccountExtraInformationService } from '@services';
import { AccountExtraInformationCM, AccountExtraInformationUM, AccountExtraInformationVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('AccountExtraInformation')
@Controller('/api/v1/AccountExtraInformation')
export class AccountExtraInformationController {
  constructor(
    protected readonly service: AccountExtraInformationService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all AccountExtraInformations' })
  @ApiOkResponse({ description: 'Success return all AccountExtraInformations' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<AccountExtraInformationVM[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an AccountExtraInformation by Id' })
  @ApiOkResponse({ description: "Success return an AccountExtraInformation's information" })
  @ApiNotFoundResponse({ description: 'Fail to find AccountExtraInformation by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<AccountExtraInformationVM> {
    return await this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new AccountExtraInformation' })
  @ApiCreatedResponse({ description: 'Success create new AccountExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: AccountExtraInformationCM): Promise<AccountExtraInformationVM> {
    return await this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an AccountExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success update new AccountExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: AccountExtraInformationUM): Promise<AccountExtraInformationVM> {
    return await this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an AccountExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success delete new AccountExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<AccountExtraInformationVM> {
    return await this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an AccountExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success active new AccountExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async active(@Param('id') id: string): Promise<AccountExtraInformationVM> {
    return await this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an AccountExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new AccountExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async deactive(@Param('id') id: string): Promise<AccountExtraInformationVM> {
    return await this.service.deactive(id);
  }
}
