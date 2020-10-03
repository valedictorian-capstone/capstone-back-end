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
  ApiTags,
} from '@nestjs/swagger';
import { CustomerExtraInformationUM, CustomerExtraInformationVM } from '@view-models';
import { CustomerExtraInformationService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('CustomerExtraInformation')
@Controller('/api/v1/CustomerExtraInformation')
export class CustomerExtraInformationController{
  constructor(
    protected service: CustomerExtraInformationService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all CustomerExtraInformations' })
  @ApiOkResponse({ description: 'Success return all CustomerExtraInformations' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<CustomerExtraInformationVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an CustomerExtraInformation by Id' })
  @ApiOkResponse({ description: "Success return an CustomerExtraInformation's information" })
  @ApiNotFoundResponse({ description: 'Fail to find CustomerExtraInformation by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<CustomerExtraInformationVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new CustomerExtraInformation' })
  @ApiCreatedResponse({ description: 'Success create new CustomerExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body()  body: CustomerExtraInformationUM[]): Promise<any> {
    return this.service.insert(body);
  }
}
