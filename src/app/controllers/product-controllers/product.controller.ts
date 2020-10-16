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
import { ProductCM, ProductUM, ProductVM } from '@view-models';
import { ProductService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('Product')
@Controller('/api/v1/Product')
export class ProductController{
  constructor(
    protected service: ProductService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all Products' })
  @ApiOkResponse({ description: 'Success return all Products' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<ProductVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Product by Id' })
  @ApiOkResponse({ description: "Success return an Product's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Product by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<ProductVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new Product' })
  @ApiCreatedResponse({ description: 'Success create new Product' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: ProductCM): Promise<ProductVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an Product by Id' })
  @ApiCreatedResponse({ description: 'Success update new Product' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: ProductUM): Promise<ProductVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Product by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Product' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<ProductVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an Product by Id' })
  @ApiCreatedResponse({ description: 'Success active new Product' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<ProductVM[]> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an Product by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new Product' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<ProductVM[]> {
    return this.service.deactive(id);
  }
}
