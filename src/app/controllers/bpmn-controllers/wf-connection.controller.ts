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
import { WFConnectionService } from '@services';
import { WFConnectionCM, WFConnectionUM, WFConnectionVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('WorkFlowConnection')
@Controller('/api/v1/wf-connection')
export class WFConnectionController {
  constructor(
    protected readonly wfConnectionService: WFConnectionService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all wf' })
  @ApiOkResponse({ description: 'Success return all wf' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<WFConnectionVM[]> {
    return await this.wfConnectionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an wf connection by Id' })
  @ApiOkResponse({ description: "Success return an wf connection's information" })
  @ApiNotFoundResponse({ description: 'Fail to find wf connection by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<WFConnectionVM> {
    return await this.wfConnectionService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new wf connection' })
  @ApiCreatedResponse({ description: 'Success create new wf connection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: WFConnectionCM): Promise<WFConnectionVM> {
    return await this.wfConnectionService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an wf connection by Id' })
  @ApiCreatedResponse({ description: 'Success update new wf connection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: WFConnectionUM): Promise<WFConnectionVM> {
    return await this.wfConnectionService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an wf connection by Id' })
  @ApiCreatedResponse({ description: 'Success delete new wf connection' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<WFConnectionVM> {
    return await this.wfConnectionService.remove(id);
  }
}
