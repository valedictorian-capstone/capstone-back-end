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
import { ProductExtraInformationCM, ProductExtraInformationUM, ProductExtraInformationVM } from '@view-models';
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
  public insert(@Body() body: ProductExtraInformationCM): Promise<ProductExtraInformationVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an ProductExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success update new ProductExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: ProductExtraInformationUM): Promise<ProductExtraInformationVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ProductExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success delete new ProductExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<ProductExtraInformationVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an ProductExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success active new ProductExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<ProductExtraInformationVM> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an ProductExtraInformation by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new ProductExtraInformation' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<ProductExtraInformationVM> {
    return this.service.deactive(id);
  }
}
