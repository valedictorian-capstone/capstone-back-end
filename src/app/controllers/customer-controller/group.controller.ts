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
import { GroupCM, GroupUM, GroupVM } from '@view-models';
import { GroupService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('Group')
@Controller('/api/v1/Group')
export class GroupController{
  constructor(
    protected service: GroupService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all Groups' })
  @ApiOkResponse({ description: 'Success return all Groups' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findAll(): Promise<GroupVM[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Group by Id' })
  @ApiOkResponse({ description: "Success return an Group's information" })
  @ApiNotFoundResponse({ description: 'Fail to find Group by Id' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public findById(@Param('id') id: string): Promise<GroupVM> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert new Group' })
  @ApiCreatedResponse({ description: 'Success create new Group' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public insert(@Body() body: GroupCM): Promise<GroupVM[]> {
    return this.service.insert(body);
  }

  @Put()
  @ApiOperation({ summary: 'Update an Group by Id' })
  @ApiCreatedResponse({ description: 'Success update new Group' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public update(@Body() body: GroupUM): Promise<GroupVM[]> {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Group by Id' })
  @ApiCreatedResponse({ description: 'Success delete new Group' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public remove(@Param('id') id: string): Promise<GroupVM> {
    return this.service.remove(id);
  }

  @Put('Active/:id')
  @ApiOperation({ summary: 'Active an Group by Id' })
  @ApiCreatedResponse({ description: 'Success active new Group' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public active(@Param('id') id: string): Promise<GroupVM[]> {
    return this.service.active(id);
  }

  @Put('DeActive/:id')
  @ApiOperation({ summary: 'Deative an Group by Id' })
  @ApiCreatedResponse({ description: 'Success deactive new Group' })
  @ApiBadRequestResponse({ description: 'Have error in run time' })
  public deactive(@Param('id') id: string): Promise<GroupVM[]> {
    return this.service.deactive(id);
  }
}
