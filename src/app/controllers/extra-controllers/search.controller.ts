import { Controller, Get, Query, Headers } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchService } from '@services';
import { AccountVM } from '@view-models';

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
  public async search(@Query('value') value: string, @Headers('requester') requester: AccountVM): Promise<any[]> {
    return this.searchService.search(value, requester);
  }

}
