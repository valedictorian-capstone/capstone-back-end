import {
  Body,
  Controller,
  Inject,
  Post
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { FirebaseService } from '@services';
import { FIREBASE_SERVICE } from '@types';
import { FileCM } from 'src/app/view-models/extra-view-models/file.view-model';

@ApiBearerAuth('JWT')
@ApiTags('File Service')
@Controller('/api/v1/file')
export class FileController {
  constructor(
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Upload File ' })
  @ApiCreatedResponse({ description: 'Success create File' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: FileCM): Promise<string> {
    return this.firebaseService.useUploadFileBase64('', '', '');
  }
}
