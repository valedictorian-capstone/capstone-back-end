import {
  Body,
  Controller,
  Delete,
  Get,
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
  ApiTags
} from '@nestjs/swagger';
import { ProcessCM, ProcessUM, ProcessVM } from '@view-models';
import { ProcessService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('Process')
@Controller('/api/v1/Process')
export class ProcessController {
  constructor(
    protected readonly processService: ProcessService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all process' })
  @ApiOkResponse({ description: 'Success return all process' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<ProcessVM[]> {
    return await this.processService.findAll();
  }

  @Get('/unique')
  @ApiOperation({ summary: 'Check duplicate data ' })
  @ApiOkResponse({ description: "Success return value is exist in database" })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public checkEnique(@Query('label') label: string, @Query('value') value: string): Promise<boolean> {
    return this.processService.checkUnique(label, value);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an process by Id' })
  @ApiOkResponse({ description: "Success return an process's information" })
  @ApiNotFoundResponse({ description: 'Fail to find process by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<ProcessVM> {
    return await this.processService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new process' })
  @ApiCreatedResponse({ description: 'Success create new process' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: ProcessCM): Promise<ProcessVM> {
    return await this.processService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an process by Id' })
  @ApiCreatedResponse({ description: 'Success update new process' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: ProcessUM): Promise<ProcessVM> {
    return await this.processService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an process by Id' })
  @ApiCreatedResponse({ description: 'Success delete new process' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<ProcessVM> {
    return await this.processService.remove(id);
  }
}
