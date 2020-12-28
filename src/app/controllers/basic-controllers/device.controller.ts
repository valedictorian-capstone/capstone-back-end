import {
  Controller,
  Delete,
  Get,
  Headers,
  Param
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,

  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { DeviceService } from '@services';
import { EmployeeVM, DeviceVM } from '@view-models';

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
  public findAll(@Headers('requester') requester: EmployeeVM): DeviceVM[] {
    return requester.devices;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Device by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Device' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<DeviceVM> {
    return this.service.remove(id);
  }
}
