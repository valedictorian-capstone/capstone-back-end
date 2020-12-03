import {
  Body,
  Controller,
  Delete,
  Get,
  Param,

  Put
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { CategoryService } from '@services';
import { CategoryCM, CategoryVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('Category')
@Controller('/api/v1/Category')
export class CategoryController {
  constructor(
    protected readonly service: CategoryService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all Category' })
  @ApiOkResponse({ description: 'Success return all Category' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<CategoryVM[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Category Id' })
  @ApiOkResponse({ description: "Success return an Category" })
  @ApiNotFoundResponse({ description: 'Fail to find Category' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<CategoryVM> {
    return await this.service.findById(id);
  }

  @Put()
  @ApiOperation({ summary: 'Save new Category step' })
  @ApiCreatedResponse({ description: 'Success create new Category' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async save(@Body() body: CategoryCM): Promise<CategoryVM> {
    return await this.service.save(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Category step by Id' })
  @ApiCreatedResponse({ description: 'Success delete Category' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<CategoryVM> {
    return await this.service.remove(id);
  }

  @Put('restore/:id')
  @ApiOperation({ summary: 'Restore an category by Id' })
  @ApiCreatedResponse({ description: 'Success restore new Category' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public restore(@Param('id') id: string): Promise<CategoryVM> {
    return this.service.restore(id);
  }
}
