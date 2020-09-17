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
import {
  WorkFlowInstanceCM,
  WorkFlowInstanceUM,
  WorkFlowInstanceVM,
} from 'src/app/view-models';
import { IWorkFlowInstanceController } from 'src/app/interfaces';
import { WorkFlowInstanceService } from 'src/app/services';

@ApiBearerAuth('JWT')
@ApiTags('WorkFlowInstance')
@Controller('/api/v1/WorkFlowInstance')
export class WorkFlowInstanceController implements IWorkFlowInstanceController {
  constructor(
    protected readonly service: WorkFlowInstanceService,
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all workFlowInstances' })
  @ApiOkResponse({ description: 'Success return all workFlowInstances' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<WorkFlowInstanceVM[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an workFlowInstance by Id' })
  @ApiOkResponse({
    description: "Success return an workFlowInstance's information",
  })
  @ApiNotFoundResponse({ description: 'Fail to find workFlowInstance by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<WorkFlowInstanceVM> {
    return await this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new workFlowInstance' })
  @ApiCreatedResponse({ description: 'Success create new workFlowInstance' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(
    @Body() body: WorkFlowInstanceCM,
  ): Promise<WorkFlowInstanceVM> {
    return await this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an workFlowInstance by Id' })
  @ApiCreatedResponse({ description: 'Success update new workFlowInstance' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(
    @Body() body: WorkFlowInstanceUM,
  ): Promise<WorkFlowInstanceVM> {
    return await this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an workFlowInstance by Id' })
  @ApiCreatedResponse({ description: 'Success delete new workFlowInstance' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(id: string): Promise<WorkFlowInstanceVM> {
    return await this.service.remove(id);
  }

  @Put('Active')
  @ApiOperation({ summary: 'Active an workFlowInstance by Id' })
  @ApiCreatedResponse({ description: 'Success active new workFlowInstance' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async active(id: string): Promise<WorkFlowInstanceVM> {
    return await this.service.active(id);
  }

  @Put('DeActive')
  @ApiOperation({ summary: 'Deative an workFlowInstance by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new workFlowInstance' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async deactive(id: string): Promise<WorkFlowInstanceVM> {
    return await this.service.deactive(id);
  }
}
