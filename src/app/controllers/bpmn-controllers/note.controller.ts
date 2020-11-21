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
import { NoteService } from '@services';
import { NoteCM, NoteUM, NoteVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('Note')
@Controller('/api/v1/Note')
export class NoteController {
  constructor(
    protected readonly noteService: NoteService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all note' })
  @ApiOkResponse({ description: 'Success return all note' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<NoteVM[]> {
    return await this.noteService.findAll();
  }

  @Get('/deal/:id')
  @ApiOperation({ summary: 'Get all note' })
  @ApiOkResponse({ description: 'Success return all note' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findByDeal(@Param('id') id: string): Promise<NoteVM[]> {
    return await this.noteService.findByDeal(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an note by Id' })
  @ApiOkResponse({ description: "Success return an note's information" })
  @ApiNotFoundResponse({ description: 'Fail to find note by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<NoteVM> {
    return await this.noteService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new note' })
  @ApiCreatedResponse({ description: 'Success create new note' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: NoteCM): Promise<NoteVM> {
    return await this.noteService.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an note by Id' })
  @ApiCreatedResponse({ description: 'Success update new note' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: NoteUM): Promise<NoteVM> {
    return await this.noteService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an note by Id' })
  @ApiCreatedResponse({ description: 'Success delete new note' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<NoteVM> {
    return await this.noteService.remove(id);
  }
}
