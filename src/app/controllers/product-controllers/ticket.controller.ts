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
import { Request } from '@nestjs/common';
  
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
    public insert(@Request() req: any, @Body() body: TicketCM): Promise<TicketVM> {
      const token = req.headers.authorization;
      return this.service.insert(body, token);
    }

     
    @Post('/bot')
    @ApiOperation({ summary: 'Bot Insert new Ticket' })
    @ApiCreatedResponse({ description: 'Success create new Ticket' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public botInsert(@Request() req: any, @Body() body: TicketCM): Promise<TicketVM> {
      return this.service.botInsert(body);
    }
  
    @Put()
    @ApiOperation({ summary: 'Update an Ticket by Id' })
    @ApiCreatedResponse({ description: 'Success update new Ticket' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public update(@Request() req: any, @Body() body: TicketUM): Promise<TicketVM> {
      const token = req.headers.authorization;
      return this.service.update(body, token);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an Ticket by Id' })
    @ApiCreatedResponse({ description: 'Success delete new Ticket' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(@Param('id') id: string): Promise<TicketVM> {
      return this.service.remove(id);
    }
  }
  