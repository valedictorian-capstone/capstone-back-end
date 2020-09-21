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
import { CustomerExtraDataCM, CustomerExtraDataUM, CustomerExtraDataVM } from '@view-models';
import { CustomerExtraDataService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('CustomerExtraData')
@Controller('/api/v1/CustomerExtraData')
export class CustomerExtraDataController{
  constructor(
    protected service: CustomerExtraDataService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all CustomerExtraDatas' })
  @ApiOkResponse({ description: 'Success return all CustomerExtraDatas' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<CustomerExtraDataVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an CustomerExtraData by Id' })
  @ApiOkResponse({ description: "Success return an CustomerExtraData's information" })
  @ApiNotFoundResponse({ description: 'Fail to find CustomerExtraData by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<CustomerExtraDataVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new CustomerExtraData' })
  @ApiCreatedResponse({ description: 'Success create new CustomerExtraData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: CustomerExtraDataCM): Promise<CustomerExtraDataVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an CustomerExtraData by Id' })
  @ApiCreatedResponse({ description: 'Success update new CustomerExtraData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: CustomerExtraDataUM): Promise<CustomerExtraDataVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an CustomerExtraData by Id' })
  @ApiCreatedResponse({ description: 'Success delete new CustomerExtraData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<CustomerExtraDataVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an CustomerExtraData by Id' })
  @ApiCreatedResponse({ description: 'Success active new CustomerExtraData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<CustomerExtraDataVM> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an CustomerExtraData by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new CustomerExtraData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<CustomerExtraDataVM> {
    return this.service.deactive(id);
  }
}
