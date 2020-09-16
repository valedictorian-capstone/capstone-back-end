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
  WorkFlowConnectionCM,
  WorkFlowConnectionUM,
  WorkFlowConnectionVM,
} from 'src/app/dtos';
import { IWorkFlowConnectionController } from 'src/app/interfaces';
import { WorkFlowConnectionService } from 'src/app/services';

@ApiBearerAuth('JWT')
@ApiTags('WorkFlowConnection')
@Controller('/api/v1/WorkFlowConnection')
export class WorkFlowConnectionController
  implements IWorkFlowConnectionController {
  constructor(
    protected readonly workFlowConnectionService: WorkFlowConnectionService,
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all workFlowConnections' })
  @ApiOkResponse({ description: 'Success return all workFlowConnections' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<WorkFlowConnectionVM[]> {
    return await this.workFlowConnectionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an workFlowConnection by Id' })
  @ApiOkResponse({
    description: "Success return an workFlowConnection's information",
  })
  @ApiNotFoundResponse({ description: 'Fail to find workFlowConnection by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(
    @Param('id') id: string,
  ): Promise<WorkFlowConnectionVM> {
    return await this.workFlowConnectionService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new workFlowConnection' })
  @ApiCreatedResponse({ description: 'Success create new workFlowConnection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(
    @Body() body: WorkFlowConnectionCM,
  ): Promise<WorkFlowConnectionVM> {
    return await this.workFlowConnectionService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an workFlowConnection by Id' })
  @ApiCreatedResponse({ description: 'Success update new workFlowConnection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(
    @Body() body: WorkFlowConnectionUM,
  ): Promise<WorkFlowConnectionVM> {
    return await this.workFlowConnectionService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an workFlowConnection by Id' })
  @ApiCreatedResponse({ description: 'Success delete new workFlowConnection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(id: string): Promise<WorkFlowConnectionVM> {
    return await this.workFlowConnectionService.remove(id);
  }

  @Put('Active')
  @ApiOperation({ summary: 'Active an workFlowConnection by Id' })
  @ApiCreatedResponse({ description: 'Success active new workFlowConnection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async active(id: string): Promise<WorkFlowConnectionVM> {
    return await this.workFlowConnectionService.active(id);
  }

  @Put('DeActive')
  @ApiOperation({ summary: 'Deative an workFlowConnection by Id' })
  @ApiCreatedResponse({
    description: 'Success deactive new workFlowConnection',
  })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async deactive(id: string): Promise<WorkFlowConnectionVM> {
    return await this.workFlowConnectionService.deactive(id);
  }
}
