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
import { ProcessStepInstanceService } from '@services';
import { ProcessStepInstanceCM, ProcessStepInstanceUM, ProcessStepInstanceVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('ProcessStepInstance')
@Controller('/api/v1/ProcessStepInstance')
export class ProcessStepInstanceController {
  constructor(
    protected readonly processtepInstanceService: ProcessStepInstanceService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all process' })
  @ApiOkResponse({ description: 'Success return all process' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<ProcessStepInstanceVM[]> {
    return await this.processtepInstanceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an process step by Id' })
  @ApiOkResponse({ description: "Success return an process step's information" })
  @ApiNotFoundResponse({ description: 'Fail to find process step by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<ProcessStepInstanceVM> {
    return await this.processtepInstanceService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new process step' })
  @ApiCreatedResponse({ description: 'Success create new process step' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: ProcessStepInstanceCM): Promise<ProcessStepInstanceVM[]> {
    return await this.processtepInstanceService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an process step by Id' })
  @ApiCreatedResponse({ description: 'Success update new process step' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: ProcessStepInstanceUM): Promise<ProcessStepInstanceVM[]> {
    return await this.processtepInstanceService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an process step by Id' })
  @ApiCreatedResponse({ description: 'Success delete new process step' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<ProcessStepInstanceVM> {
    return await this.processtepInstanceService.remove(id);
  }
}
