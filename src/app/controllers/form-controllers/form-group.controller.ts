import {
    Body,
    Controller,
    Delete,
    Get,
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

    @Get('/unique')
    @ApiOperation({ summary: 'Check duplicate data for phoneNumber, email, code' })
    @ApiOkResponse({ description: "Success return value is exist in database" })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public checkEnique(@Query('label') label: string, @Query('value') value: string): Promise<string> {
      return this.service.checkUnique(label, value);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an form-group by Id' })
    @ApiCreatedResponse({ description: 'Success delete new form-group' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public remove(@Param('id') id: string): Promise<FormGroupVM> {
        return this.service.remove(id);
    }

    @Put('Active')
    @ApiOperation({ summary: 'Active an form-group by Id' })
    @ApiCreatedResponse({ description: 'Success active new form-group' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public active(@Body() ids: string[]): Promise<FormGroupVM> {
        return this.service.active(ids);
    }

    @Put('DeActive')
    @ApiOperation({ summary: 'Deative an form-group by Id' })
    @ApiCreatedResponse({ description: 'Success deactive new form-group' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public deactive(@Body() ids: string[]): Promise<FormGroupVM> {
        return this.service.deactive(ids);
    }
}