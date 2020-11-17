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
  @ApiOperation({ summary: 'Get all pipeline' })
  @ApiOkResponse({ description: 'Success return all pipeline' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<PipelineVM[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an pipeline Id' })
  @ApiOkResponse({ description: "Success return an pipeline" })
  @ApiNotFoundResponse({ description: 'Fail to find pipeline' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<PipelineVM> {
    return await this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Save new pipeline step' })
  @ApiCreatedResponse({ description: 'Success create new pipeline' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async save(@Body() body: PipelineCM): Promise<PipelineVM> {
    return await this.service.save(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an pipeline step by Id' })
  @ApiCreatedResponse({ description: 'Success delete pipeline' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<PipelineVM> {
    return await this.service.remove(id);
  }
}
