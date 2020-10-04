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
import { FormDataCM, FormDataUM, FormDataVM } from '@view-models';
import { FormDataService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('FormData')
@Controller('/api/v1/FormData')
export class FormDataController {
    constructor(
        protected service: FormDataService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all form-data' })
    @ApiOkResponse({ description: 'Success return all form-data' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findAll(): Promise<FormDataVM[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an form-data by Id' })
    @ApiOkResponse({ description: "Success return an form-data's information" })
    @ApiNotFoundResponse({ description: 'Fail to find form-data by Id' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public findById(@Param('id') id: string): Promise<FormDataVM> {
        return this.service.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Insert new form-data' })
    @ApiCreatedResponse({ description: 'Success create new form-data' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public insert(@Body() body: FormDataCM): Promise<FormDataVM[]> {
        return this.service.insert(body);
    }

    @Put()
    @ApiOperation({ summary: 'Update an form-data by Id' })
    @ApiCreatedResponse({ description: 'Success update new form-data' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public update(@Body() body: FormDataUM): Promise<FormDataVM[]> {
        return this.service.update(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an form-data by Id' })
    @ApiCreatedResponse({ description: 'Success delete new form-data' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(id: string): Promise<FormDataVM> {
        return this.service.remove(id);
    }

    @Put('Active:id')
    @ApiOperation({ summary: 'Active an form-data by Id' })
    @ApiCreatedResponse({ description: 'Success active new form-data' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public active(@Param('id')id: string): Promise<FormDataVM[]> {
        return this.service.active(id);
    }

    @Put('DeActive:id')
    @ApiOperation({ summary: 'Deative an form-data by Id' })
    @ApiCreatedResponse({ description: 'Success deactive new form-data' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public deactive(@Param('id') id: string): Promise<FormDataVM[]> {
        return this.service.deactive(id);
    }
}