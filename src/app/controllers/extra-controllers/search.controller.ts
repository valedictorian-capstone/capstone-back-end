import { Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  public async search(@Query('value') value: string): Promise<any[]> {
    return this.searchService.search(value);
  }

}
