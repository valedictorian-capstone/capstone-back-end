import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
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
import { RoleCM, RoleUM, RoleVM } from '@view-models';
import { RoleService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('Role')
@Controller('/api/v1/Role')
export class RoleController {
  constructor(
    protected service: RoleService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all Roles' })
  @ApiOkResponse({ description: 'Success return all Roles' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<RoleVM[]> {
    return this.service.findAll();
  }

  @Get('/unique')
  @ApiOperation({ summary: 'Check duplicate data for phoneNumber, email, code' })
  @ApiOkResponse({ description: "Success return value is exist in database" })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public checkEnique(@Query('label') label: string, @Query('value') value: string): Promise<string> {
    return this.service.checkUnique(label, value);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Role by Id' })
  @ApiOkResponse({ description: "Success return an Role's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Role by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<RoleVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new Role' })
  @ApiCreatedResponse({ description: 'Success create new Role' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: RoleCM): Promise<RoleVM> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an Role by Id' })
  @ApiCreatedResponse({ description: 'Success update new Role' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: RoleUM): Promise<RoleVM> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Role by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Role' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<RoleVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an Role by Id' })
  @ApiCreatedResponse({ description: 'Success active new Role' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<RoleVM[]> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an Role by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new Role' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<RoleVM[]> {
    return this.service.deactive(id);
  }
}
