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
import { WFStepInstanceService } from '@services';
import { WFStepInstanceCM, WFStepInstanceUM, WFStepInstanceVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('WorkFlowStepInstance')
@Controller('/api/v1/wf-step-instance')
export class WFStepInstanceController {
  constructor(
    protected readonly wftepInstanceService: WFStepInstanceService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all wf' })
  @ApiOkResponse({ description: 'Success return all wf' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<WFStepInstanceVM[]> {
    return await this.wftepInstanceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an wf step by Id' })
  @ApiOkResponse({ description: "Success return an wf step's information" })
  @ApiNotFoundResponse({ description: 'Fail to find wf step by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<WFStepInstanceVM> {
    return await this.wftepInstanceService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new wf step' })
  @ApiCreatedResponse({ description: 'Success create new wf step' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: WFStepInstanceCM): Promise<WFStepInstanceVM[]> {
    return await this.wftepInstanceService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an wf step by Id' })
  @ApiCreatedResponse({ description: 'Success update new wf step' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: WFStepInstanceUM): Promise<WFStepInstanceVM[]> {
    return await this.wftepInstanceService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an wf step by Id' })
  @ApiCreatedResponse({ description: 'Success delete new wf step' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<WFStepInstanceVM> {
    return await this.wftepInstanceService.remove(id);
  }
}
