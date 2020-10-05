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
import { FormValueCM, FormValueUM, FormValueVM } from '@view-models';
import { FormValueService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('FormValue')
@Controller('/api/v1/FormValue')
export class FormValueController {
    constructor(
        protected service: FormValueService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all form-value' })
    @ApiOkResponse({ description: 'Success return all form-value' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAll(): Promise<FormValueVM[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an form-value by Id' })
    @ApiOkResponse({ description: "Success return an form-value's information" })
    @ApiNotFoundResponse({ description: 'Fail to find form-value by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findById(@Param('id') id: string): Promise<FormValueVM> {
        return this.service.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Insert new form-value' })
    @ApiCreatedResponse({ description: 'Success create new form-value' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public insert(@Body() body: FormValueCM): Promise<FormValueVM[]> {
        return this.service.insert(body);
    }

    @Put()
    @ApiOperation({ summary: 'Update an form-value by Id' })
    @ApiCreatedResponse({ description: 'Success update new form-value' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public update(@Body() body: FormValueUM): Promise<FormValueVM[]> {
        return this.service.update(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an form-value by Id' })
    @ApiCreatedResponse({ description: 'Success delete new form-value' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(id: string): Promise<FormValueVM> {
        return this.service.remove(id);
    }

    @Put('Active:id')
    @ApiOperation({ summary: 'Active an form-value by Id' })
    @ApiCreatedResponse({ description: 'Success active new form-value' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public active(@Param('id')id: string): Promise<FormValueVM[]> {
        return this.service.active(id);
    }

    @Put('DeActive:id')
    @ApiOperation({ summary: 'Deative an form-value by Id' })
    @ApiCreatedResponse({ description: 'Success deactive new form-value' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public deactive(@Param('id') id: string): Promise<FormValueVM[]> {
        return this.service.deactive(id);
    }
}