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
import { CampaignService } from '@services';
import { CampaignCM, CampaignSendEmailRequest, CampaignUM, CampaignVM } from '@view-models';
import { Query } from '@nestjs/common';

@ApiBearerAuth('JWT')
@ApiTags('Campaign')
@Controller('/api/v1/Campaign')
export class CampaignController {
  constructor(
    protected readonly service: CampaignService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all Campaign' })
  @ApiOkResponse({ description: 'Success return all Campaign' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<CampaignVM[]> {
    return await this.service.findAll();
  }

  @Get('/deal/:id')
  @ApiOperation({ summary: 'Get all Campaign' })
  @ApiOkResponse({ description: 'Success return all Campaign' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findByDeal(@Param('id') id: string): Promise<CampaignVM[]> {
    return await this.service.findByDeal(id);
  }

  @Get('/query')
  @ApiOperation({ summary: 'Get an Campaign by Id' })
  @ApiOkResponse({ description: "Success return an Campaign's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Campaign by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public query(@Query('key') key: string, @Query('id') id: string): Promise<CampaignVM[]> {
    return this.service.query(key, id);
  }
  @Get('/statistical/:id')
  @ApiOperation({ summary: 'Get an Campaign by Id' })
  @ApiOkResponse({ description: "Success return an Campaign's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Campaign by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public statistical(@Param('id') id: string): Promise<any> {
    return this.service.statistical(id);
}

  @Get(':id')
  @ApiOperation({ summary: 'Get an Campaign by Id' })
  @ApiOkResponse({ description: "Success return an Campaign's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Campaign by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<CampaignVM> {
    return await this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new Campaign' })
  @ApiCreatedResponse({ description: 'Success create new Campaign' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: CampaignCM): Promise<CampaignVM> {
    return await this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an Campaign by Id' })
  @ApiCreatedResponse({ description: 'Success update new Campaign' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: CampaignUM): Promise<CampaignVM> {
    return await this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Campaign by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Campaign' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<CampaignVM> {
    return await this.service.remove(id);
  }


  @Post('/send-campagin')
  @ApiOperation({ summary: 'sendCampaignEmail by ' })
  @ApiCreatedResponse({ description: 'Success delete new Campaign' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async sendCampaignEmail(@Body() body: CampaignSendEmailRequest) {
    return this.service.sendCampaign(body.campaignId, body.groupIds, body.emailTemplate);
  }


}
