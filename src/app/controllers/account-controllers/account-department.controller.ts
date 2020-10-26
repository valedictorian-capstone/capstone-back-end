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
  import { AccountDepartmentCM, AccountDepartmentUM, AccountDepartmentVM } from '@view-models';
  import { AccountDepartmentService } from '@services';
  
  @ApiBearerAuth('JWT')
  @ApiTags('AccountDepartment')
  @Controller('/api/v1/AccountDepartment')
  export class AccountDepartmentController {
    constructor(
      protected service: AccountDepartmentService,
    ) { }
  
    @Get()
    @ApiOperation({ summary: 'Get all AccountDepartments' })
    @ApiOkResponse({ description: 'Success return all AccountDepartments' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAll(): Promise<AccountDepartmentVM[]> {
      return this.service.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get an AccountDepartment by Id' })
    @ApiOkResponse({ description: "Success return an AccountDepartment's information" })
    @ApiNotFoundResponse({ description: 'Fail to find AccountDepartment by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findById(@Param('id') id: string): Promise<AccountDepartmentVM> {
      return this.service.findById(id);
    }
  
    @Post()
    @ApiOperation({ summary: 'Insert new AccountDepartment' })
    @ApiCreatedResponse({ description: 'Success create new AccountDepartment' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public insert(@Body() body: AccountDepartmentCM): Promise<AccountDepartmentVM> {
      return this.service.insert(body);
    }
  
    @Put()
    @ApiOperation({ summary: 'Update an AccountDepartment by Id' })
    @ApiCreatedResponse({ description: 'Success update new AccountDepartment' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public update(@Body() body: AccountDepartmentUM): Promise<AccountDepartmentVM> {
      return this.service.update(body);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an AccountDepartment by Id' })
    @ApiCreatedResponse({ description: 'Success delete new AccountDepartment' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(@Param('id') id: string): Promise<AccountDepartmentVM> {
      return this.service.remove(id);
    }
  
    @Put('Active/:id')
    @ApiOperation({ summary: 'Active an AccountDepartment by Id' })
    @ApiCreatedResponse({ description: 'Success active new AccountDepartment' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public active(@Param('id') id: string): Promise<AccountDepartmentVM[]> {
      return this.service.active(id);
    }
  
    @Put('DeActive/:id')
    @ApiOperation({ summary: 'Deative an AccountDepartment by Id' })
    @ApiCreatedResponse({ description: 'Success deactive new AccountDepartment' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public deactive(@Param('id') id: string): Promise<AccountDepartmentVM[]> {
      return this.service.deactive(id);
    }
  }
  