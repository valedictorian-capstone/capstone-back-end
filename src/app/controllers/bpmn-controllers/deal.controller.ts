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
import { DealService } from '@services';
import { DealCM, DealUM, DealVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('Deal')
@Controller('/api/v1/Deal')
export class DealController {
  constructor(
    protected readonly dealService: DealService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all deal' })
  @ApiOkResponse({ description: 'Success return all deal' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<DealVM[]> {
    return await this.dealService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an deal by Id' })
  @ApiOkResponse({ description: "Success return an deal's information" })
  @ApiNotFoundResponse({ description: 'Fail to find deal by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<DealVM> {
    return await this.dealService.findById(id);
  }

  @Get('/stage/:id')
  @ApiOperation({ summary: 'Get an deal by stage' })
  @ApiOkResponse({ description: "Success return an deal's information" })
  @ApiNotFoundResponse({ description: 'Fail to find deal by stage' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findByStage(@Param('id') id: string): Promise<DealVM[]> {
    return await this.dealService.findByStage(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new deal' })
  @ApiCreatedResponse({ description: 'Success create new deal' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: DealCM): Promise<DealVM> {
    return await this.dealService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an deal by Id' })
  @ApiCreatedResponse({ description: 'Success update new deal' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: DealUM | DealUM[]): Promise<DealVM | DealVM[]> {
    return await this.dealService.update(body);
  }

  @Put('/stage')
  @ApiOperation({ summary: 'Update an deal by Id' })
  @ApiCreatedResponse({ description: 'Success update new deal' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async updateStage(@Body() body: DealUM): Promise<DealVM> {
    return await this.dealService.updateStage(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an deal by Id' })
  @ApiCreatedResponse({ description: 'Success delete new deal' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<DealVM> {
    return await this.dealService.remove(id);
  }
  @Put('restore/:id')
  @ApiOperation({ summary: 'Restore an deal by Id' })
  @ApiCreatedResponse({ description: 'Success restore new deal' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async restore(@Param('id') id: string): Promise<DealVM> {
    return await this.dealService.restore(id);
  }
}
