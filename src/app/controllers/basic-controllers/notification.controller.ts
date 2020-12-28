import {
  Body,
  Controller,
  Get,
  Headers,
  Param,

  Put
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { NotificationService } from '@services';
import { EmployeeVM, CustomerVM, NotificationVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('Notification')
@Controller('/api/v1/Notification')
export class NotificationController {
  constructor(
    protected service: NotificationService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all Notifications' })
  @ApiOkResponse({ description: 'Success return all Notifications' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(@Headers('requester') requester: EmployeeVM): NotificationVM[] {
    return requester.notifications;
  }
  @Get('/Customer')
  @ApiOperation({ summary: 'Get all Notifications' })
  @ApiOkResponse({ description: 'Success return all Notifications' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAllByCustomer(@Headers('requester') requester: CustomerVM): NotificationVM[] {
    return requester.notifications;
  }
  @Put('/Seen')
  @ApiOperation({ summary: 'Seen one' })
  @ApiCreatedResponse({ description: 'Success seen ntification' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public seenAll(@Body() notifications: NotificationVM[]): Promise<NotificationVM[]> {
    return this.service.seenAll(notifications);
  }
  @Put('/Seen/:id')
  @ApiOperation({ summary: 'Seen one' })
  @ApiCreatedResponse({ description: 'Success seen ntification' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public seen(@Param('id') id: string): Promise<NotificationVM> {
    return this.service.seen(id);
  }

}
