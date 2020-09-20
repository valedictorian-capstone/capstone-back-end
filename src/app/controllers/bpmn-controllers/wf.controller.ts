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
import { WFCM, WFUM, WFVM } from '@view-models';
import { WFService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('WorkFlow')
@Controller('/api/v1/wf')
export class WFController {
  constructor(
    protected readonly wfService: WFService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all wf' })
  @ApiOkResponse({ description: 'Success return all wf' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<WFVM[]> {
    return await this.wfService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an work flow by Id' })
  @ApiOkResponse({ description: "Success return an work flow's information" })
  @ApiNotFoundResponse({ description: 'Fail to find work flow by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<WFVM> {
    return await this.wfService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new work flow' })
  @ApiCreatedResponse({ description: 'Success create new work flow' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: WFCM): Promise<WFVM> {
    return await this.wfService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an work flow by Id' })
  @ApiCreatedResponse({ description: 'Success update new work flow' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: WFUM): Promise<WFVM> {
    return await this.wfService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an work flow by Id' })
  @ApiCreatedResponse({ description: 'Success delete new work flow' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<WFVM> {
    return await this.wfService.remove(id);
  }
}
