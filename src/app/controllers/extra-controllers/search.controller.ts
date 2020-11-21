import { Controller, Get, Query, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { SearchService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('Search')
@Controller('/api/v1/Search')
export class SearchController {
  constructor(
    protected searchService: SearchService
  ) { }

  @Get()
  @ApiOperation({ summary: 'Search' })
  @ApiOkResponse({ description: 'Search' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async search(@Query('value') value: string, @Request() req: any): Promise<any[]> {
    const token = req.headers.authorization;
    return this.searchService.search(value, token);
  }

}
