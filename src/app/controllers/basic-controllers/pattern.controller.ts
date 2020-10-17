import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import { PatternService } from '@services';
import { PatternCM, PatternUM, PatternVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('Pattern')
@Controller('/api/v1/Pattern')
export class PatternController {
  constructor(
    protected readonly service: PatternService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all Patterns' })
  @ApiOkResponse({ description: 'Success return all Patterns' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<PatternVM[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Pattern by Id' })
  @ApiOkResponse({ description: "Success return an Pattern's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Pattern by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<PatternVM> {
    return await this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new Pattern' })
  @ApiCreatedResponse({ description: 'Success create new Pattern' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: PatternCM): Promise<PatternVM> {
    return await this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an Pattern by Id' })
  @ApiCreatedResponse({ description: 'Success update new Pattern' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: PatternUM): Promise<PatternVM> {
    return await this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Pattern by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Pattern' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<PatternVM> {
    return await this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an Pattern by Id' })
  @ApiCreatedResponse({ description: 'Success active new Pattern' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async active(@Param('id') id: string): Promise<PatternVM> {
    return await this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an Pattern by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new Pattern' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async deactive(@Param('id') id: string): Promise<PatternVM> {
    return await this.service.deactive(id);
  }
}
