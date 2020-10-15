import {
  Body,
  Controller,
  Delete,
  Get,
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
import { AccountExtraInformationDataCM, AccountExtraInformationDataUM, AccountExtraInformationDataVM } from '@view-models';
import { AccountExtraInformationDataService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('AccountExtraInformationData')
@Controller('/api/v1/AccountExtraInformationData')
export class AccountExtraInformationDataController{
  constructor(
    protected service: AccountExtraInformationDataService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all AccountExtraInformationDatas' })
  @ApiOkResponse({ description: 'Success return all AccountExtraInformationDatas' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<AccountExtraInformationDataVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an AccountExtraInformationData by Id' })
  @ApiOkResponse({ description: "Success return an AccountExtraInformationData's information" })
  @ApiNotFoundResponse({ description: 'Fail to find AccountExtraInformationData by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<AccountExtraInformationDataVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new AccountExtraInformationData' })
  @ApiCreatedResponse({ description: 'Success create new AccountExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: AccountExtraInformationDataCM): Promise<AccountExtraInformationDataVM[]> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an AccountExtraInformationData by Id' })
  @ApiCreatedResponse({ description: 'Success update new AccountExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: AccountExtraInformationDataUM): Promise<AccountExtraInformationDataVM[]> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an AccountExtraInformationData by Id' })
  @ApiCreatedResponse({ description: 'Success delete new AccountExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<AccountExtraInformationDataVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an AccountExtraInformationData by Id' })
  @ApiCreatedResponse({ description: 'Success active new AccountExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<AccountExtraInformationDataVM[]> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an AccountExtraInformationData by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new AccountExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<AccountExtraInformationDataVM[]> {
    return this.service.deactive(id);
  }
}
