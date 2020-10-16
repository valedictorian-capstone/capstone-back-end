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
import { RoleService } from '@services';
import { RoleCM, RoleUM, RoleVM } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('Role')
@Controller('/api/v1/Role')
export class RoleController {
  constructor(
    protected readonly service: RoleService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse({ description: 'Success return all roles' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findAll(): Promise<RoleVM[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an role by Id' })
  @ApiOkResponse({ description: "Success return an role's information" })
  @ApiNotFoundResponse({ description: 'Fail to find role by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async findById(@Param('id') id: string): Promise<RoleVM> {
    return await this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new role' })
  @ApiCreatedResponse({ description: 'Success create new role' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async insert(@Body() body: RoleCM): Promise<RoleVM> {
    return await this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an role by Id' })
  @ApiCreatedResponse({ description: 'Success update new role' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async update(@Body() body: RoleUM): Promise<RoleVM> {
    return await this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an role by Id' })
  @ApiCreatedResponse({ description: 'Success delete new role' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async remove(@Param('id') id: string): Promise<RoleVM> {
    return await this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an role by Id' })
  @ApiCreatedResponse({ description: 'Success active new role' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async active(@Param('id') id: string): Promise<RoleVM[]> {
    return await this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an role by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new role' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public async deactive(@Param('id') id: string): Promise<RoleVM[]> {
    return await this.service.deactive(id);
  }
}
