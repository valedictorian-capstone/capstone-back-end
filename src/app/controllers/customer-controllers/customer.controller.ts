import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { CustomerCM, CustomerUM, CustomerVM, AccountVM } from '@view-models';
import { CustomerService } from '@services';
import { Headers } from '@nestjs/common';

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
  public findAll(@Headers('requester') requester: AccountVM): Promise<CustomerVM[]> {
    return this.service.findAll(undefined ,requester);
  }

  @Get('/lead')
  @ApiOperation({ summary: 'Get all Customers by type lead' })
  @ApiOkResponse({ description: 'Success return all Customers by type lead' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAllByLead(@Headers('requester') requester: AccountVM): Promise<CustomerVM[]> {
    return this.service.findAllByLead(requester);
  }

  @Get('/unique')
  @ApiOperation({ summary: 'Check duplicate data for phoneNumber, email, code' })
  @ApiOkResponse({ description: "Success return value is exist in database" })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public checkEnique(@Query('label') label: string, @Query('value') value: string): Promise<string> {
    return this.service.checkUnique(label, value);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Customer by Id' })
  @ApiOkResponse({ description: "Success return an Customer's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Customer by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<CustomerVM> {
    return this.service.findById(id);
  }

  @Post('/import')
  @ApiOperation({ summary: 'Import List Customer' })
  @ApiCreatedResponse({ description: 'Success insert list to database' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public import(@Body() body: CustomerCM[]): Promise<any> {
    return this.service.import(body);
  }
  @Post()
  @ApiOperation({ summary: 'Insert new Customer' })
  @ApiCreatedResponse({ description: 'Success insert new Customer' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: CustomerCM): Promise<any> {
    return this.service.insert(body);
  }
  @Put()
  @ApiOperation({ summary: 'Update an Customer by Id' })
  @ApiCreatedResponse({ description: 'Success update new Customer' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: CustomerUM): Promise<CustomerVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Customer by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Customer' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<CustomerVM> {
    return this.service.remove(id);
  }

  @Put('restore/:id')
  @ApiOperation({ summary: 'Restore an customer by Id' })
  @ApiCreatedResponse({ description: 'Success restore new Customer' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public restore(@Param('id') id: string): Promise<CustomerVM> {
    return this.service.restore(id);
  }
}
