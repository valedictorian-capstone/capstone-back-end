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
import { TaskCM, TaskUM, TaskVM } from '@view-models';
import { TaskService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('Task')
@Controller('/api/v1/Task')
export class TaskController {
    constructor(
        protected service: TaskService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all task' })
    @ApiOkResponse({ description: 'Success return all task' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAll(): Promise<TaskVM[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an task by Id' })
    @ApiOkResponse({ description: "Success return an task's information" })
    @ApiNotFoundResponse({ description: 'Fail to find task by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findById(@Param('id') id: string): Promise<TaskVM> {
        return this.service.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Insert new task' })
    @ApiCreatedResponse({ description: 'Success create new task' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public insert(@Body() body: TaskCM): Promise<TaskVM[]> {
        return this.service.insert(body);
    }

    @Put()
    @ApiOperation({ summary: 'Update an task by Id' })
    @ApiCreatedResponse({ description: 'Success update new task' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public update(@Body() body: TaskUM): Promise<TaskVM> {
        return this.service.update(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an task by Id' })
    @ApiCreatedResponse({ description: 'Success delete new task' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(id: string): Promise<TaskVM> {
        return this.service.remove(id);
    }

    @Put('Active:id')
    @ApiOperation({ summary: 'Active an task by Id' })
    @ApiCreatedResponse({ description: 'Success active new task' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public active(@Param('id') id: string): Promise<TaskVM[]> {
        return this.service.active(id);
    }

    @Put('DeActive:id')
    @ApiOperation({ summary: 'Deative an task by Id' })
    @ApiCreatedResponse({ description: 'Success deactive new task' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public deactive(@Param('id') id: string): Promise<TaskVM[]> {
        return this.service.deactive(id);
    }
}