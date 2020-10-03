import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
import { AccountExtraInformationUM, AccountExtraInformationVM } from '@view-models';

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
  public async insert(@Body() body: AccountExtraInformationUM[]): Promise<AccountExtraInformationVM> {
    return await this.service.insert(body);
  }
}
