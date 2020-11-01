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
  import { TriggerCM, TriggerUM, TriggerVM } from '@view-models';
  import { TriggerService } from '@services';
  
  @ApiBearerAuth('JWT')
  @ApiTags('Trigger')
  @Controller('/api/v1/Trigger')
  export class TriggerController{
    constructor(
      protected service: TriggerService,
    ) {}
  
    @Get()
    @ApiOperation({ summary: 'Get all Triggers' })
    @ApiOkResponse({ description: 'Success return all Triggers' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAll(): Promise<TriggerVM[]> {
      return this.service.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get an Trigger by Id' })
    @ApiOkResponse({ description: "Success return an Trigger's information" })
    @ApiNotFoundResponse({ description: 'Fail to find Trigger by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findById(@Param('id') id: string): Promise<TriggerVM> {
      return this.service.findById(id);
    }
  
    @Post()
    @ApiOperation({ summary: 'Insert new Trigger' })
    @ApiCreatedResponse({ description: 'Success create new Trigger' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public insert(@Body() body: TriggerCM): Promise<TriggerVM> {
      return this.service.insert(body);
    }
  
    @Put()
    @ApiOperation({ summary: 'Update an Trigger by Id' })
    @ApiCreatedResponse({ description: 'Success update new Trigger' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public update(@Body() body: TriggerUM): Promise<TriggerVM> {
      return this.service.update(body);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an Trigger by Id' })
    @ApiCreatedResponse({ description: 'Success delete new Trigger' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(@Param('id') id: string): Promise<TriggerVM> {
      return this.service.remove(id);
    }
  
    @Put('Active/:id')
    @ApiOperation({ summary: 'Active an Trigger by Id' })
    @ApiCreatedResponse({ description: 'Success active new Trigger' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public active(@Param('id') id: string): Promise<TriggerVM[]> {
      return this.service.active(id);
    }
  
    @Put('DeActive/:id')
    @ApiOperation({ summary: 'Deative an Trigger by Id' })
    @ApiCreatedResponse({ description: 'Success deactive new Trigger' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public deactive(@Param('id') id: string): Promise<TriggerVM[]> {
      return this.service.deactive(id);
    }
  }
  