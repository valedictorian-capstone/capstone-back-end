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
import { FormGroupCM, FormGroupUM, FormGroupVM } from '@view-models';
import { FormGroupService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('FormGroup')
@Controller('/api/v1/FormGroup')
export class FormGroupController {
    constructor(
        protected service: FormGroupService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all form-group' })
    @ApiOkResponse({ description: 'Success return all form-group' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAll(): Promise<FormGroupVM[]> {
        return this.service.findAll();
    }

    @Get('/FormControl')
    @ApiOperation({ summary: 'Get all form-group contain form-control' })
    @ApiOkResponse({ description: 'Success return all form-group' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAllContainFormControl(): Promise<FormGroupVM[]> {
        return this.service.findAllContainFormControl();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an form-group by Id' })
    @ApiOkResponse({ description: "Success return an form-group's information" })
    @ApiNotFoundResponse({ description: 'Fail to find form-group by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findById(@Param('id') id: string): Promise<FormGroupVM> {
        return this.service.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Insert new form-group' })
    @ApiCreatedResponse({ description: 'Success create new form-group' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public insert(@Body() body: FormGroupCM): Promise<FormGroupVM> {
        return this.service.insert(body);
    }

    @Put()
    @ApiOperation({ summary: 'Update an form-group by Id' })
    @ApiCreatedResponse({ description: 'Success update new form-group' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public update(@Body() body: FormGroupUM): Promise<FormGroupVM> {
        return this.service.update(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an form-group by Id' })
    @ApiCreatedResponse({ description: 'Success delete new form-group' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(id: string): Promise<FormGroupVM> {
        return this.service.remove(id);
    }

    @Put('Active:id')
    @ApiOperation({ summary: 'Active an form-group by Id' })
    @ApiCreatedResponse({ description: 'Success active new form-group' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public active(@Param('id')id: string): Promise<FormGroupVM> {
        return this.service.active(id);
    }

    @Put('DeActive:id')
    @ApiOperation({ summary: 'Deative an form-group by Id' })
    @ApiCreatedResponse({ description: 'Success deactive new form-group' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public deactive(@Param('id') id: string): Promise<FormGroupVM> {
        return this.service.deactive(id);
    }
}