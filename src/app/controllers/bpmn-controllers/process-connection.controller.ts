import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { ProcessConnectionService } from '@services';
import { ProcessConnectionCM, ProcessConnectionUM, ProcessConnectionVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('ProcessConnection')
@Controller('/api/v1/process-connection')
export class ProcessConnectionController {
  constructor(
    protected readonly processConnectionService: ProcessConnectionService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all process' })
  @ApiOkResponse({ description: 'Success return all process' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<ProcessConnectionVM[]> {
    return await this.processConnectionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an process connection by Id' })
  @ApiOkResponse({ description: "Success return an process connection's information" })
  @ApiNotFoundResponse({ description: 'Fail to find process connection by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<ProcessConnectionVM> {
    return await this.processConnectionService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new process connection' })
  @ApiCreatedResponse({ description: 'Success create new process connection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: ProcessConnectionCM): Promise<ProcessConnectionVM> {
    return await this.processConnectionService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an process connection by Id' })
  @ApiCreatedResponse({ description: 'Success update new process connection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: ProcessConnectionUM): Promise<ProcessConnectionVM> {
    return await this.processConnectionService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an process connection by Id' })
  @ApiCreatedResponse({ description: 'Success delete new process connection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<ProcessConnectionVM> {
    return await this.processConnectionService.remove(id);
  }
}
