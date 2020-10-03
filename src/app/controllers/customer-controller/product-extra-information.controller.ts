import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
import { ProductExtraInformationUM, ProductExtraInformationVM } from '@view-models';
import { ProductExtraInformationService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('ProductExtraInformation')
@Controller('/api/v1/ProductExtraInformation')
export class ProductExtraInformationController{
  constructor(
    protected service: ProductExtraInformationService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all ProductExtraInformations' })
  @ApiOkResponse({ description: 'Success return all ProductExtraInformations' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<ProductExtraInformationVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an ProductExtraInformation by Id' })
  @ApiOkResponse({ description: "Success return an ProductExtraInformation's information" })
  @ApiNotFoundResponse({ description: 'Fail to find ProductExtraInformation by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<ProductExtraInformationVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new ProductExtraInformation' })
  @ApiCreatedResponse({ description: 'Success create new ProductExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: ProductExtraInformationUM[]): Promise<any> {
    return this.service.insert(body);
  }
}
