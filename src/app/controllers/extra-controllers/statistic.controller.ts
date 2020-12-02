import { Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatisticService } from '@services';
import { CustomerVM, DealVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('Statistic')
@Controller('/api/v1/Statistic')
export class StatisticController {
  constructor(
    protected statisticService: StatisticService
  ) { }

  @Get('/CustomerInMonth')
  @ApiOperation({ summary: 'CustomerInMonth' })
  @ApiOkResponse({ description: 'CustomerInMonth' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async getCustomerInMonth(@Query('month') month: number, @Query('year') year: number): Promise<{ id: string, name: string, data: CustomerVM[] }[]> {
    return this.statisticService.getCustomerInMonth(month, year);
  }

  @Get('/CustomerInYear')
  @ApiOperation({ summary: 'CustomerInYear' })
  @ApiOkResponse({ description: 'CustomerInYear' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async getCustomerInYear(@Query('year') year: number): Promise<{ id: string, name: string, data: Array<CustomerVM>[]}[]> {
    return this.statisticService.getCustomerInYear(year);
  }

  @Get('/DealInMonth')
  @ApiOperation({ summary: 'DealInMonth' })
  @ApiOkResponse({ description: 'DealInMonth' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async getDealInMonth(@Query('month') month: number, @Query('year') year: number): Promise<{ status: string, data: DealVM[] }[]> {
    return this.statisticService.getDealInMonth(month, year);
  }

  @Get('/DealInYear')
  @ApiOperation({ summary: 'DealInYear' })
  @ApiOkResponse({ description: 'DealInYear' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async getDealInYear(@Query('year') year: number): Promise<{ status: string, data: Array<DealVM[]> }[]> {
    return this.statisticService.getDealInYear(year);
  }

}
