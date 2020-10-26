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
import { ServiceCM, ServiceUM, ServiceVM } from '@view-models';
import { ServiceService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('Service')
@Controller('/api/v1/Service')
export class ServiceController{
  constructor(
    protected service: ServiceService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all Services' })
  @ApiOkResponse({ description: 'Success return all Services' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<ServiceVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Service by Id' })
  @ApiOkResponse({ description: "Success return an Service's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Service by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<ServiceVM> {
    return this.service.findById(id);
  }

  @Get('/unique')
  @ApiOperation({ summary: 'Check duplicate data' })
  @ApiOkResponse({ description: "Success return value is exist in database" })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public checkEnique(@Query('label') label: string, @Query('value') value: string): Promise<string> {
    return this.service.checkUnique(label, value);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new Service' })
  @ApiCreatedResponse({ description: 'Success create new Service' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: ServiceCM[]): Promise<any> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an Service by Id' })
  @ApiCreatedResponse({ description: 'Success update new Service' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: ServiceUM): Promise<ServiceVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Service by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Service' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<ServiceVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an Service by Id' })
  @ApiCreatedResponse({ description: 'Success active new Service' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<ServiceVM[]> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an Service by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new Service' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<ServiceVM[]> {
    return this.service.deactive(id);
  }
}
