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
import { CustomerExtraInformationCM, CustomerExtraInformationUM, CustomerExtraInformationVM } from '@view-models';
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
  public insert(@Body() body: CustomerExtraInformationCM): Promise<CustomerExtraInformationVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an CustomerExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success update new CustomerExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: CustomerExtraInformationUM): Promise<CustomerExtraInformationVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an CustomerExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success delete new CustomerExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<CustomerExtraInformationVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an CustomerExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success active new CustomerExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<CustomerExtraInformationVM> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an CustomerExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new CustomerExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<CustomerExtraInformationVM> {
    return this.service.deactive(id);
  }
}
