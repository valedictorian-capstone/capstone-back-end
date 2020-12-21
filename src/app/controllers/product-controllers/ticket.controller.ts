import {
  Body,
  Controller,
  Delete,
  Get, Headers, Param,
  Post,
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
import { TicketService } from '@services';
import { AccountVM, CustomerVM, TicketCM, TicketUM, TicketVM } from '@view-models';
  
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
    public findAll(@Headers('requester') requester: AccountVM): Promise<TicketVM[]> {
      return this.service.findAll(requester);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get an Ticket by Id' })
    @ApiOkResponse({ description: "Success return an Ticket's information" })
    @ApiNotFoundResponse({ description: 'Fail to find Ticket by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findById(@Param('id') id: string): Promise<TicketVM> {
      return this.service.findById(id);
    }

    @Get('/customer/:id')
    @ApiOperation({ summary: 'Get an ticket by Customer Id' })
    @ApiOkResponse({ description: "Success return an ticket's information" })
    @ApiNotFoundResponse({ description: 'Fail to find ticket by Customer Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public async findByCustomerId(@Param('id') id: string): Promise<TicketVM[]> {
      return await this.service.findByCustomerId(id);
    }
  
    @Post()
    @ApiOperation({ summary: 'Insert new Ticket' })
    @ApiCreatedResponse({ description: 'Success create new Ticket' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public insert(@Headers('requester') requester: CustomerVM, @Body() body: TicketCM): Promise<TicketVM> {
      return this.service.insert(body, requester);
    }

     
    @Post('/bot')
    @ApiOperation({ summary: 'Bot Insert new Ticket' })
    @ApiCreatedResponse({ description: 'Success create new Ticket' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public botInsert( @Body() body: TicketCM): Promise<TicketVM> {
      return this.service.botInsert(body);
    }

    @Post('/Unauthorized')
    @ApiOperation({ summary: 'Bot Insert new Ticket' })
    @ApiCreatedResponse({ description: 'Success create new Ticket' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public unAuthorizedInsert( @Body() body: TicketCM): Promise<TicketVM> {
      return this.service.unAuthorizedInsert(body);
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
  }
  