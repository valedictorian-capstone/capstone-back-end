import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { LogService } from '@services';
import { LogVM } from '@view-models';
import { Query, Put, Body } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@ApiTags('Log')
@Controller('/api/v1/Log')
export class LogController {
  constructor(
    protected readonly service: LogService,
  ) { }

  @Get('/query')
  @ApiOperation({ summary: 'Get all Log' })
  @ApiOkResponse({ description: 'Success return all Log' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public query(@Query('key') key: string, @Query('id') id: string): Promise<LogVM[]> {
    return this.service.query(key, id);
}

  @Get('/deal/:id')
  @ApiOperation({ summary: 'Get all Log' })
  @ApiOkResponse({ description: 'Success return all Log' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findByDeal(@Param('id') id: string): Promise<LogVM[]> {
    return await this.service.findByDeal(id);
  }

  @Put('/many')
  @ApiOperation({ summary: 'Delete an task by Id' })
  @ApiCreatedResponse({ description: 'Success delete new task' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public removeMany(@Body() body: LogVM[]): Promise<LogVM[]> {
      return this.service.removeMany(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Log by Id' })
  @ApiOkResponse({ description: "Success return an Log's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Log by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<LogVM> {
    return await this.service.findById(id);
  }


}
