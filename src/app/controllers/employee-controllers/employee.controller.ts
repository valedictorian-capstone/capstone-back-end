import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import { EmployeeService } from '@services';
import { EmployeeCM, EmployeeUM, EmployeeVM } from '@view-models';
import { request } from 'http';

@ApiBearerAuth('JWT')
@ApiTags('Employee')
@Controller('/api/v1/Employee')
export class EmployeeController {
  constructor(
    protected service: EmployeeService,
  ) { }
  @Get()
  @ApiOperation({ summary: 'Get all Employees' })
  @ApiOkResponse({ description: 'Success return all Employees' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  @ApiQuery({ name: 'roleName', allowEmptyValue: true })
  public findAll(@Headers('requester') requester: EmployeeVM): Promise<EmployeeVM[]> {
    console.log(this.service.findAll(requester))
    return this.service.findAll(requester);
  }
  @Get('/unique')
  @ApiOperation({ summary: 'Check duplicate data for phoneNumber, email, code' })
  @ApiOkResponse({ description: "Success return value is exist in database" })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public checkEnique(@Query('label') label: string, @Query('value') value: string): Promise<boolean> {
    return this.service.checkUnique(label, value);
  }
  @Get('/query')
  @ApiOperation({ summary: 'Get an task by Id' })
  @ApiOkResponse({ description: "Success return an task's information" })
  @ApiNotFoundResponse({ description: 'Fail to find task by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public query(@Query('id') id: string): Promise<EmployeeVM[]> {
      return this.service.query(id);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get an Employee by Id' })
  @ApiOkResponse({ description: "Success return an Employee's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Employee by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<EmployeeVM> {
    return this.service.findById(id);
  }
  @Post()
  @ApiOperation({ summary: 'Insert new Employee' })
  @ApiCreatedResponse({ description: 'Success create new Employee' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: EmployeeCM): Promise<EmployeeVM> {
    return this.service.insert(body);
  }
  @Post('/import')
  @ApiOperation({ summary: 'Import List Employee' })
  @ApiCreatedResponse({ description: 'Success insert list to database' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public import(@Body() body: EmployeeCM[]): Promise<any> {
    return this.service.import(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an Employee by Id' })
  @ApiCreatedResponse({ description: 'Success update new Employee' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: EmployeeUM): Promise<EmployeeVM> {
    return this.service.update(body);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Employee by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Employee' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<EmployeeVM> {
    return this.service.remove(id);
  }
  @Put('restore/:id')
  @ApiOperation({ summary: 'Restore an employee by Id' })
  @ApiCreatedResponse({ description: 'Success active new Employee' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public restore(@Param('id') id: string): Promise<EmployeeVM> {
    return this.service.restore(id);
  }

  @Post(':id/assign')
  @ApiOperation({ summary: 'assign deals an employee deals' })
  @ApiCreatedResponse({ description: 'Success assign deals an employee deals' })
  @ApiBadRequestResponse({ description: 'Have assign deals an employee deals' })
  public assignDealForEmployee(@Param('id') employeeId: string, @Body() dealIds: string[]) {
    return this.service.assignDealForEmployees(employeeId, dealIds);
  }
}
