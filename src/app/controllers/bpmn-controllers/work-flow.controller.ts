import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
import { Sequelize } from 'sequelize-typescript';
import { WorkFlowCM, WorkFlowUM, WorkFlowVM } from 'src/app/view-models';
import { IWorkFlowController } from 'src/app/interfaces';
import { WorkFlowService } from 'src/app/services';

@ApiBearerAuth('JWT')
@ApiTags('WorkFlow')
@Controller('/api/v1/WorkFlow')
export class WorkFlowController implements IWorkFlowController {
  constructor(
    protected readonly service: WorkFlowService,
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all workFlows' })
  @ApiOkResponse({ description: 'Success return all workFlows' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<WorkFlowVM[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an workFlow by Id' })
  @ApiOkResponse({ description: "Success return an workFlow's information" })
  @ApiNotFoundResponse({ description: 'Fail to find workFlow by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<WorkFlowVM> {
    return await this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new workFlow' })
  @ApiCreatedResponse({ description: 'Success create new workFlow' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: WorkFlowCM): Promise<WorkFlowVM> {
    return await this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an workFlow by Id' })
  @ApiCreatedResponse({ description: 'Success update new workFlow' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: WorkFlowUM): Promise<WorkFlowVM> {
    return await this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an workFlow by Id' })
  @ApiCreatedResponse({ description: 'Success delete new workFlow' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(id: string): Promise<WorkFlowVM> {
    return await this.service.remove(id);
  }

  @Put('Active')
  @ApiOperation({ summary: 'Active an workFlow by Id' })
  @ApiCreatedResponse({ description: 'Success active new workFlow' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async active(id: string): Promise<WorkFlowVM> {
    return await this.service.active(id);
  }

  @Put('DeActive')
  @ApiOperation({ summary: 'Deative an workFlow by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new workFlow' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async deactive(id: string): Promise<WorkFlowVM> {
    return await this.service.deactive(id);
  }
}
