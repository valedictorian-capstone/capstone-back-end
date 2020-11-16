import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request
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
import { ActivityCM, ActivityUM, ActivityVM } from '@view-models';
import { ActivityService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('Activity')
@Controller('/api/v1/Activity')
export class ActivityController {
    constructor(
        protected service: ActivityService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all task' })
    @ApiOkResponse({ description: 'Success return all task' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAll(): Promise<ActivityVM[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an task by Id' })
    @ApiOkResponse({ description: "Success return an task's information" })
    @ApiNotFoundResponse({ description: 'Fail to find task by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findById(@Param('id') id: string): Promise<ActivityVM> {
        return this.service.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Insert new task' })
    @ApiCreatedResponse({ description: 'Success create new task' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public insert(@Body() body: ActivityCM, @Request() req: any): Promise<ActivityVM> {
        return this.service.insert(body, req.headers.authorization);
    }

    @Put()
    @ApiOperation({ summary: 'Update an task by Id' })
    @ApiCreatedResponse({ description: 'Success update new task' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public update(@Body() body: ActivityUM): Promise<ActivityVM> {
        return this.service.update(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an task by Id' })
    @ApiCreatedResponse({ description: 'Success delete new task' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(id: string): Promise<ActivityVM> {
        return this.service.remove(id);
    }

    @Put('Active:id')
    @ApiOperation({ summary: 'Active an task by Id' })
    @ApiCreatedResponse({ description: 'Success active new task' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public active(@Param('id') id: string): Promise<ActivityVM[]> {
        return this.service.active(id);
    }

    @Put('DeActive:id')
    @ApiOperation({ summary: 'Deative an task by Id' })
    @ApiCreatedResponse({ description: 'Success deactive new task' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public deactive(@Param('id') id: string): Promise<ActivityVM[]> {
        return this.service.deactive(id);
    }
}