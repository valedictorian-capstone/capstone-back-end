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
  import { EventCM, EventUM, EventVM } from '@view-models';
  import { EventService } from '@services';
  
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
  
    @Put('Active/:id')
    @ApiOperation({ summary: 'Active an Event by Id' })
    @ApiCreatedResponse({ description: 'Success active new Event' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public active(@Param('id') id: string): Promise<EventVM[]> {
      return this.service.active(id);
    }
  
    @Put('DeActive/:id')
    @ApiOperation({ summary: 'Deative an Event by Id' })
    @ApiCreatedResponse({ description: 'Success deactive new Event' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public deactive(@Param('id') id: string): Promise<EventVM[]> {
      return this.service.deactive(id);
    }
  }
  