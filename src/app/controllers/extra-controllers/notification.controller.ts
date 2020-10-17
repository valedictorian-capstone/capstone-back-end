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
import { NotificationCM, NotificationUM, NotificationVM } from '@view-models';
import { NotificationService } from '@services';

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
  public findAll(): Promise<NotificationVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Notification by Id' })
  @ApiOkResponse({ description: "Success return an Notification's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Notification by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<NotificationVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new Notification' })
  @ApiCreatedResponse({ description: 'Success create new Notification' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: NotificationCM): Promise<NotificationVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an Notification by Id' })
  @ApiCreatedResponse({ description: 'Success update new Notification' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: NotificationUM): Promise<NotificationVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Notification by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Notification' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<NotificationVM> {
    return this.service.remove(id);
  }
}
