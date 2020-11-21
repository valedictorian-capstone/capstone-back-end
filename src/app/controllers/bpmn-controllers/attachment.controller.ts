import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,

  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { AttachmentService } from '@services';
import { AttachmentUM, AttachmentVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('Attachment')
@Controller('/api/v1/Attachment')
export class AttachmentController {
  constructor(
    protected service: AttachmentService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all task' })
  @ApiOkResponse({ description: 'Success return all task' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<AttachmentVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an task by Id' })
  @ApiOkResponse({ description: "Success return an task's information" })
  @ApiNotFoundResponse({ description: 'Fail to find task by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<AttachmentVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new task' })
  @UseInterceptors(FilesInterceptor('files'))
  @ApiCreatedResponse({ description: 'Success create new task' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: any, @UploadedFiles() files: File[]): Promise<AttachmentVM[]> {
    return this.service.insert(body, files);
  }

  @Put()
  @ApiOperation({ summary: 'Update an task by Id' })
  @ApiCreatedResponse({ description: 'Success update new task' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: AttachmentUM): Promise<AttachmentVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an task by Id' })
  @ApiCreatedResponse({ description: 'Success delete new task' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(id: string): Promise<AttachmentVM> {
    return this.service.remove(id);
  }
}