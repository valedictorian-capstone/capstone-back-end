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
import { PipelineService } from '@services';
import { PipelineCM, PipelineVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('Pipeline')
@Controller('/api/v1/Pipeline')
export class PipelineController {
  constructor(
    protected readonly service: PipelineService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all Pipeline' })
  @ApiOkResponse({ description: 'Success return all Pipeline' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<PipelineVM[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Pipeline Id' })
  @ApiOkResponse({ description: "Success return an Pipeline" })
  @ApiNotFoundResponse({ description: 'Fail to find Pipeline' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<PipelineVM> {
    return await this.service.findById(id);
  }

  @Put()
  @ApiOperation({ summary: 'Save new Pipeline step' })
  @ApiCreatedResponse({ description: 'Success create new Pipeline' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async save(@Body() body: PipelineCM): Promise<PipelineVM> {
    return await this.service.save(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Pipeline step by Id' })
  @ApiCreatedResponse({ description: 'Success delete Pipeline' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<PipelineVM> {
    return await this.service.remove(id);
  }

  @Put('restore/:id')
  @ApiOperation({ summary: 'Restore an pipeline step by Id' })
  @ApiCreatedResponse({ description: 'Success restore Pipeline' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async restore(@Param('id') id: string): Promise<PipelineVM> {
    return await this.service.restore(id);
  }
}
