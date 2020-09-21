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
import { CustomerExtraInformationDataCM, CustomerExtraInformationDataUM, CustomerExtraInformationDataVM } from '@view-models';
import { CustomerExtraInformationDataService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('CustomerExtraInformationData')
@Controller('/api/v1/CustomerExtraInformationData')
export class CustomerExtraInformationDataController{
  constructor(
    protected service: CustomerExtraInformationDataService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all CustomerExtraInformationDatas' })
  @ApiOkResponse({ description: 'Success return all CustomerExtraInformationDatas' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<CustomerExtraInformationDataVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an CustomerExtraInformationData by Id' })
  @ApiOkResponse({ description: "Success return an CustomerExtraInformationData's information" })
  @ApiNotFoundResponse({ description: 'Fail to find CustomerExtraInformationData by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<CustomerExtraInformationDataVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new CustomerExtraInformationData' })
  @ApiCreatedResponse({ description: 'Success create new CustomerExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: CustomerExtraInformationDataCM): Promise<CustomerExtraInformationDataVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an CustomerExtraInformationData by Id' })
  @ApiCreatedResponse({ description: 'Success update new CustomerExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: CustomerExtraInformationDataUM): Promise<CustomerExtraInformationDataVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an CustomerExtraInformationData by Id' })
  @ApiCreatedResponse({ description: 'Success delete new CustomerExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<CustomerExtraInformationDataVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an CustomerExtraInformationData by Id' })
  @ApiCreatedResponse({ description: 'Success active new CustomerExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<CustomerExtraInformationDataVM> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an CustomerExtraInformationData by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new CustomerExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<CustomerExtraInformationDataVM> {
    return this.service.deactive(id);
  }
}
