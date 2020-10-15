import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { ProductExtraInformationDataCM, ProductExtraInformationDataUM, ProductExtraInformationDataVM } from '@view-models';
import { ProductExtraInformationDataService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('ProductExtraInformationData')
@Controller('/api/v1/ProductExtraInformationData')
export class ProductExtraInformationDataController{
  constructor(
    protected service: ProductExtraInformationDataService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all ProductExtraInformationDatas' })
  @ApiOkResponse({ description: 'Success return all ProductExtraInformationDatas' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<ProductExtraInformationDataVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an ProductExtraInformationData by Id' })
  @ApiOkResponse({ description: "Success return an ProductExtraInformationData's information" })
  @ApiNotFoundResponse({ description: 'Fail to find ProductExtraInformationData by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<ProductExtraInformationDataVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new ProductExtraInformationData' })
  @ApiCreatedResponse({ description: 'Success create new ProductExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: ProductExtraInformationDataCM): Promise<ProductExtraInformationDataVM[]> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an ProductExtraInformationData by Id' })
  @ApiCreatedResponse({ description: 'Success update new ProductExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: ProductExtraInformationDataUM): Promise<ProductExtraInformationDataVM[]> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ProductExtraInformationData by Id' })
  @ApiCreatedResponse({ description: 'Success delete new ProductExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<ProductExtraInformationDataVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an ProductExtraInformationData by Id' })
  @ApiCreatedResponse({ description: 'Success active new ProductExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<ProductExtraInformationDataVM[]> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an ProductExtraInformationData by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new ProductExtraInformationData' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<ProductExtraInformationDataVM[]> {
    return this.service.deactive(id);
  }
}
