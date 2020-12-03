import {
  Body,
  Controller,
  Delete,
  Get,
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
import { DeviceCM, DeviceUM, DeviceVM } from '@view-models';
import { DeviceService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('Device')
@Controller('/api/v1/Device')
export class DeviceController{
  constructor(
    protected service: DeviceService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all Devices' })
  @ApiOkResponse({ description: 'Success return all Devices' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<DeviceVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Device by Id' })
  @ApiOkResponse({ description: "Success return an Device's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Device by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<DeviceVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new Device' })
  @ApiCreatedResponse({ description: 'Success create new Device' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: DeviceCM): Promise<DeviceVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an Device by Id' })
  @ApiCreatedResponse({ description: 'Success update new Device' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: DeviceUM): Promise<DeviceVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Device by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Device' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<DeviceVM> {
    return this.service.remove(id);
  }
}
