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
import { ProductExtraValueCM, ProductExtraValueUM, ProductExtraValueVM } from '@view-models';
import { ProductExtraValueService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('ProductExtraValue')
@Controller('/api/v1/ProductExtraValue')
export class ProductExtraValueController{
  constructor(
    protected service: ProductExtraValueService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all ProductExtraValues' })
  @ApiOkResponse({ description: 'Success return all ProductExtraValues' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<ProductExtraValueVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an ProductExtraValue by Id' })
  @ApiOkResponse({ description: "Success return an ProductExtraValue's information" })
  @ApiNotFoundResponse({ description: 'Fail to find ProductExtraValue by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<ProductExtraValueVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new ProductExtraValue' })
  @ApiCreatedResponse({ description: 'Success create new ProductExtraValue' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: ProductExtraValueCM): Promise<ProductExtraValueVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an ProductExtraValue by Id' })
  @ApiCreatedResponse({ description: 'Success update new ProductExtraValue' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: ProductExtraValueUM): Promise<ProductExtraValueVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ProductExtraValue by Id' })
  @ApiCreatedResponse({ description: 'Success delete new ProductExtraValue' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<ProductExtraValueVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an ProductExtraValue by Id' })
  @ApiCreatedResponse({ description: 'Success active new ProductExtraValue' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<ProductExtraValueVM> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an ProductExtraValue by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new ProductExtraValue' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<ProductExtraValueVM> {
    return this.service.deactive(id);
  }
}
