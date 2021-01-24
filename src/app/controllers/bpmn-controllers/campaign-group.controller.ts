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
import { CampaignGroupService } from '@services';
import { CampaignGroupCM, CampaignGroupUM, CampaignGroupVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('CampaignGroup')
@Controller('/api/v1/CampaignGroup')
export class CampaignGroupController {
  constructor(
    protected readonly CampaignGroupService: CampaignGroupService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all CampaignGroup information' })
  @ApiOkResponse({ description: 'Success return all process' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<CampaignGroupVM[]> {
    return await this.CampaignGroupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an CampaignGroup information by Id' })
  @ApiOkResponse({ description: "Success return an CampaignGroup information" })
  @ApiNotFoundResponse({ description: 'Fail to find CampaignGroup information by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<CampaignGroupVM> {
    return await this.CampaignGroupService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new CampaignGroup information' })
  @ApiCreatedResponse({ description: 'Success create new CampaignGroup information' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: CampaignGroupCM): Promise<CampaignGroupVM> {
    return await this.CampaignGroupService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an CampaignGroup information by Id' })
  @ApiCreatedResponse({ description: 'Success update new CampaignGroup information' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: CampaignGroupUM): Promise<CampaignGroupVM> {
    return await this.CampaignGroupService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an process step by Id' })
  @ApiCreatedResponse({ description: 'Success delete new CampaignGroup information' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<CampaignGroupVM> {
    return await this.CampaignGroupService.remove(id);
  }
}
