import {
  Body,
  Controller,
  Delete,
  Get,
  Param,

  Put
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
import { EventService } from '@services';
import { EventUM, EventVM, CustomerVM } from '@view-models';
import { Headers } from '@nestjs/common';
  
  @ApiBearerAuth('JWT')
  @ApiTags('Event')
  @Controller('/api/v1/Event')
  export class EventController{
    constructor(
      protected service: EventService,
    ) {}
  
    @Get()
    @ApiOperation({ summary: 'Get all Events' })
    @ApiOkResponse({ description: 'Success return all Events' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAll(): Promise<EventVM[]> {
      return this.service.findAll();
    }

    @Get('/Customer')
    @ApiOperation({ summary: 'Get all Events' })
    @ApiOkResponse({ description: 'Success return all Events' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAllByCustomer(@Headers('requester') requester: CustomerVM): Promise<EventVM[]> {
      return this.service.findAll(requester);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get an Event by Id' })
    @ApiOkResponse({ description: "Success return an Event's information" })
    @ApiNotFoundResponse({ description: 'Fail to find Event by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findById(@Param('id') id: string): Promise<EventVM> {
      return this.service.findById(id);
    }
  
    @Put()
    @ApiOperation({ summary: 'Update an Event by Id' })
    @ApiCreatedResponse({ description: 'Success update new Event' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public save(@Body() body: EventUM): Promise<EventVM> {
      return this.service.save(body);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an Event by Id' })
    @ApiCreatedResponse({ description: 'Success delete new Event' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(@Param('id') id: string): Promise<EventVM> {
      return this.service.remove(id);
    }
  }
  