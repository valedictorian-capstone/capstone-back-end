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
import { ProcessStepService } from '@services';
import { ProcessStepCM, ProcessStepUM, ProcessStepVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('ProcessStep')
@Controller('/api/v1/process-step')
export class ProcessStepController {
  constructor(
    protected readonly processStepService: ProcessStepService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all process' })
  @ApiOkResponse({ description: 'Success return all process' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<ProcessStepVM[]> {
    return await this.processStepService.findAll();
  }

  @Get('/unique')
  @ApiOperation({ summary: 'Check duplicate data ' })
  @ApiOkResponse({ description: "Success return value is exist in database" })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public checkEnique(@Query('label') label: string, @Query('value') value: string): Promise<boolean> {
    return this.processStepService.checkUnique(label, value);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an process step by Id' })
  @ApiOkResponse({ description: "Success return an process step's information" })
  @ApiNotFoundResponse({ description: 'Fail to find process step by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<ProcessStepVM> {
    return await this.processStepService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new process step' })
  @ApiCreatedResponse({ description: 'Success create new process step' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: ProcessStepCM[]): Promise<ProcessStepVM[]> {
    return await this.processStepService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an process step by Id' })
  @ApiCreatedResponse({ description: 'Success update new process step' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: ProcessStepUM[]): Promise<ProcessStepVM[]> {
    return await this.processStepService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an process step by Id' })
  @ApiCreatedResponse({ description: 'Success delete new process step' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<ProcessStepVM> {
    return await this.processStepService.remove(id);
  }
}
