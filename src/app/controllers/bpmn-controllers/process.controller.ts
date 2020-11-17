import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post
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
import { ProcessService } from '@services';
import { ProcessCM, ProcessVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('Process')
@Controller('/api/v1/Process')
export class ProcessController {
  constructor(
    protected readonly service: ProcessService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all Process' })
  @ApiOkResponse({ description: 'Success return all Process' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<ProcessVM[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Process Id' })
  @ApiOkResponse({ description: "Success return an Process" })
  @ApiNotFoundResponse({ description: 'Fail to find Process' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<ProcessVM> {
    return await this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Save new Process step' })
  @ApiCreatedResponse({ description: 'Success create new Process' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async save(@Body() body: ProcessCM): Promise<ProcessVM> {
    return await this.service.save(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Process step by Id' })
  @ApiCreatedResponse({ description: 'Success delete Process' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<ProcessVM> {
    return await this.service.remove(id);
  }
}
