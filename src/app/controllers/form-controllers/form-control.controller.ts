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
import { FormControlCM, FormControlUM, FormControlVM } from '@view-models';
import { FormControlService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('FormControl')
@Controller('/api/v1/FormControl')
export class FormControlController {
    constructor(
        protected service: FormControlService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all form-control' })
    @ApiOkResponse({ description: 'Success return all form-control' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAll(): Promise<FormControlVM[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an form-control by Id' })
    @ApiOkResponse({ description: "Success return an form-control's information" })
    @ApiNotFoundResponse({ description: 'Fail to find form-control by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findById(@Param('id') id: string): Promise<FormControlVM> {
        return this.service.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Insert new form-control' })
    @ApiCreatedResponse({ description: 'Success create new form-control' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public insert(@Body() body: FormControlCM): Promise<FormControlVM> {
        return this.service.insert(body);
    }

    @Put()
    @ApiOperation({ summary: 'Update an form-control by Id' })
    @ApiCreatedResponse({ description: 'Success update new form-control' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public update(@Body() body: FormControlUM): Promise<FormControlVM> {
        return this.service.update(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an form-control by Id' })
    @ApiCreatedResponse({ description: 'Success delete new form-control' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(id: string): Promise<FormControlVM> {
        return this.service.remove(id);
    }

    @Put('Active:id')
    @ApiOperation({ summary: 'Active an form-control by Id' })
    @ApiCreatedResponse({ description: 'Success active new form-control' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public active(@Param('id')id: string): Promise<FormControlVM> {
        return this.service.active(id);
    }

    @Put('DeActive:id')
    @ApiOperation({ summary: 'Deative an form-control by Id' })
    @ApiCreatedResponse({ description: 'Success deactive new form-control' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public deactive(@Param('id') id: string): Promise<FormControlVM> {
        return this.service.deactive(id);
    }
}