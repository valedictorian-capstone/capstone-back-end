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
import { CustomerCM, CustomerUM, CustomerVM } from '@view-models';
import { CustomerService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('Customer')
@Controller('/api/v1/Customer')
export class CustomerController{
  constructor(
    protected service: CustomerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all Customers' })
  @ApiOkResponse({ description: 'Success return all Customers' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<CustomerVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Customer by Id' })
  @ApiOkResponse({ description: "Success return an Customer's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Customer by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<CustomerVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new Customer' })
  @ApiCreatedResponse({ description: 'Success create new Customer' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: CustomerCM): Promise<CustomerVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an Customer by Id' })
  @ApiCreatedResponse({ description: 'Success update new Customer' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: CustomerUM): Promise<CustomerVM[]> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Customer by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Customer' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<CustomerVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an Customer by Id' })
  @ApiCreatedResponse({ description: 'Success active new Customer' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<CustomerVM[]> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an Customer by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new Customer' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<CustomerVM[]> {
    return this.service.deactive(id);
  }
}
