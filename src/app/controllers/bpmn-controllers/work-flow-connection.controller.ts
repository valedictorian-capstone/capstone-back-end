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
} from 'src/app/view-models';
import { IWorkFlowConnectionController } from 'src/app/interfaces';
import { WorkFlowConnectionService } from 'src/app/services';

@ApiBearerAuth('JWT')
@ApiTags('WorkFlowConnection')
@Controller('/api/v1/WorkFlowConnection')
export class WorkFlowConnectionController
  implements IWorkFlowConnectionController {
  constructor(
    protected readonly service: WorkFlowConnectionService,
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all workFlowConnections' })
  @ApiOkResponse({ description: 'Success return all workFlowConnections' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<WorkFlowConnectionVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an workFlowConnection by Id' })
  @ApiOkResponse({
    description: "Success return an workFlowConnection's information",
  })
  @ApiNotFoundResponse({ description: 'Fail to find workFlowConnection by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<WorkFlowConnectionVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new workFlowConnection' })
  @ApiCreatedResponse({ description: 'Success create new workFlowConnection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(
    @Body() body: WorkFlowConnectionCM,
  ): Promise<WorkFlowConnectionVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an workFlowConnection by Id' })
  @ApiCreatedResponse({ description: 'Success update new workFlowConnection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(
    @Body() body: WorkFlowConnectionUM,
  ): Promise<WorkFlowConnectionVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an workFlowConnection by Id' })
  @ApiCreatedResponse({ description: 'Success delete new workFlowConnection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(id: string): Promise<WorkFlowConnectionVM> {
    return this.service.remove(id);
  }

  @Put('Active')
  @ApiOperation({ summary: 'Active an workFlowConnection by Id' })
  @ApiCreatedResponse({ description: 'Success active new workFlowConnection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(id: string): Promise<WorkFlowConnectionVM> {
    return this.service.active(id);
  }

  @Put('DeActive')
  @ApiOperation({ summary: 'Deative an workFlowConnection by Id' })
  @ApiCreatedResponse({
    description: 'Success deactive new workFlowConnection',
  })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(id: string): Promise<WorkFlowConnectionVM> {
    return this.service.deactive(id);
  }
}
