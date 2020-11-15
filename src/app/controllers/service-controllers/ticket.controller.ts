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
  import { TicketCM, TicketUM, TicketVM } from '@view-models';
  import { TicketService } from '@services';
  
  @ApiBearerAuth('JWT')
  @ApiTags('Ticket')
  @Controller('/api/v1/Ticket')
  export class TicketController {
    constructor(
      protected service: TicketService,
    ) { }
  
    @Get()
    @ApiOperation({ summary: 'Get all Tickets' })
    @ApiOkResponse({ description: 'Success return all Tickets' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAll(): Promise<TicketVM[]> {
      return this.service.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get an Ticket by Id' })
    @ApiOkResponse({ description: "Success return an Ticket's information" })
    @ApiNotFoundResponse({ description: 'Fail to find Ticket by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findById(@Param('id') id: string): Promise<TicketVM> {
      return this.service.findById(id);
    }
  
    @Post()
    @ApiOperation({ summary: 'Insert new Ticket' })
    @ApiCreatedResponse({ description: 'Success create new Ticket' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public insert(@Body() body: TicketCM): Promise<TicketVM> {
      return this.service.insert(body);
    }
  
    @Put()
    @ApiOperation({ summary: 'Update an Ticket by Id' })
    @ApiCreatedResponse({ description: 'Success update new Ticket' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public update(@Body() body: TicketUM): Promise<TicketVM> {
      return this.service.update(body);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an Ticket by Id' })
    @ApiCreatedResponse({ description: 'Success delete new Ticket' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(@Param('id') id: string): Promise<TicketVM> {
      return this.service.remove(id);
    }
  
    @Put('Active/:id')
    @ApiOperation({ summary: 'Active an Ticket by Id' })
    @ApiCreatedResponse({ description: 'Success active new Ticket' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public active(@Param('id') id: string): Promise<TicketVM> {
      return this.service.active(id);
    }
  
    @Put('DeActive/:id')
    @ApiOperation({ summary: 'Deative an Ticket by Id' })
    @ApiCreatedResponse({ description: 'Success deactive new Ticket' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public deactive(@Param('id') id: string): Promise<TicketVM> {
      return this.service.deactive(id);
    }
  }
  