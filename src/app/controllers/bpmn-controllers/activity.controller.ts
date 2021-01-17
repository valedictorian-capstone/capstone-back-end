import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    Param,
    Post,
    Put,
    Query
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
import { ActivityService } from '@services';
import { EmployeeVM, ActivityCM, ActivityUM, ActivityVM } from '@view-models';

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
    public findAll(@Headers('requester') requester: EmployeeVM): Promise<ActivityVM[]> {
        return this.service.findAll(requester);
    }
    @Get('/query')
    @ApiOperation({ summary: 'Get an task by Id' })
    @ApiOkResponse({ description: "Success return an task's information" })
    @ApiNotFoundResponse({ description: 'Fail to find task by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public query(@Query('key') key: string, @Query('id') id: string): Promise<ActivityVM[]> {
        return this.service.query(key, id);
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
    public insert(@Body() body: ActivityCM, @Headers('requester') requester: EmployeeVM): Promise<ActivityVM> {
        return this.service.insert(body, requester);
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
    public remove(@Param('id') id: string): Promise<ActivityVM> {
        return this.service.remove(id);
    }
}