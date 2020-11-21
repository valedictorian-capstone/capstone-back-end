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

@ApiBearerAuth('JWT')
@ApiTags('Log')
@Controller('/api/v1/Log')
export class LogController {
  constructor(
    protected readonly logService: LogService,
  ) { }

  @Get('/deal/:id')
  @ApiOperation({ summary: 'Get all Log' })
  @ApiOkResponse({ description: 'Success return all Log' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findByDeal(@Param('id') id: string): Promise<LogVM[]> {
    return await this.logService.findByDeal(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Log by Id' })
  @ApiOkResponse({ description: "Success return an Log's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Log by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<LogVM> {
    return await this.logService.findById(id);
  }


}
