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
import { StageService } from '@services';
import { StageCM, StageUM, StageVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('Stage')
@Controller('/api/v1/Stage')
export class StageController {
  constructor(
    protected readonly stageService: StageService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all process' })
  @ApiOkResponse({ description: 'Success return all process' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<StageVM[]> {
    return await this.stageService.findAll();
  }

  @Get('/unique')
  @ApiOperation({ summary: 'Check duplicate data for phoneNumber, email, code' })
  @ApiOkResponse({ description: "Success return value is exist in database" })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public checkEnique(@Query('label') label: string, @Query('value') value: string): Promise<boolean> {
    return this.stageService.checkUnique(label, value);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an process step by Id' })
  @ApiOkResponse({ description: "Success return an process step's information" })
  @ApiNotFoundResponse({ description: 'Fail to find process step by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<StageVM> {
    return await this.stageService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new process step' })
  @ApiCreatedResponse({ description: 'Success create new process step' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: StageCM): Promise<StageVM> {
    return await this.stageService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an process step by Id' })
  @ApiCreatedResponse({ description: 'Success update new process step' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: StageUM): Promise<StageVM> {
    return await this.stageService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an process step by Id' })
  @ApiCreatedResponse({ description: 'Success delete new process step' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<StageVM> {
    return await this.stageService.remove(id);
  }
}
