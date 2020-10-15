import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { ExtraInformationUM, ExtraInformationVM } from '@view-models';
import { ExtraInformationService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('ExtraInformation')
@Controller('/api/v1/ExtraInformation')
export class ExtraInformationController {
  constructor(
    protected service: ExtraInformationService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all ExtraInformations' })
  @ApiOkResponse({ description: 'Success return all ExtraInformations' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(@Query('state') state: string): Promise<ExtraInformationVM[]> {
    console.log(state)
    return this.service.findAllByState(state);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an ExtraInformation by Id' })
  @ApiOkResponse({ description: "Success return an ExtraInformation's information" })
  @ApiNotFoundResponse({ description: 'Fail to find ExtraInformation by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<ExtraInformationVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new ExtraInformation' })
  @ApiCreatedResponse({ description: 'Success create new ExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: ExtraInformationUM[]): Promise<ExtraInformationVM[]> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an ExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success update new ExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: ExtraInformationUM[]): Promise<ExtraInformationVM[]> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success delete new ExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<ExtraInformationVM> {
    return this.service.remove(id);
  }

  @Put('Active:id')
  @ApiOperation({ summary: 'Active an ExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success active new ExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<ExtraInformationVM[]> {
    return this.service.active(id);
  }

  @Put('DeActive:id')
  @ApiOperation({ summary: 'Deative an ExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new ExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<ExtraInformationVM[]> {
    return this.service.deactive(id);
  }
}
