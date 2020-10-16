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
import { DepartmentCM, DepartmentUM, DepartmentVM } from '@view-models';
import { DepartmentService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('Department')
@Controller('/api/v1/Department')
export class DepartmentController{
  constructor(
    protected service: DepartmentService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all Departments' })
  @ApiOkResponse({ description: 'Success return all Departments' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<DepartmentVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Department by Id' })
  @ApiOkResponse({ description: "Success return an Department's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Department by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<DepartmentVM> {
    return this.service.getDepartmentChild(id);
  }

  // @Get('/tree/:id')
  // @ApiOperation({ summary: 'Get an Department by Id' })
  // @ApiOkResponse({ description: "Success return an Department's information" })
  // @ApiNotFoundResponse({ description: 'Fail to find Department by Id' })
  // @ApiBadRequestResponse({ description: 'Have error in run time' })
  // public viewTree(@Param('id') id: string): Promise<DepartmentVM> {
  //   return this.service.getDepartmentChild(id);
  // }

  @Post()
  @ApiOperation({ summary: 'Insert new Department' })
  @ApiCreatedResponse({ description: 'Success create new Department' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: DepartmentCM): Promise<DepartmentVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an Department by Id' })
  @ApiCreatedResponse({ description: 'Success update new Department' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: DepartmentUM): Promise<DepartmentVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Department by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Department' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<DepartmentVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an Department by Id' })
  @ApiCreatedResponse({ description: 'Success active new Department' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<DepartmentVM> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an Department by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new Department' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<DepartmentVM> {
    return this.service.deactive(id);
  }
}
