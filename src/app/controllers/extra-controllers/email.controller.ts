import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { EmailService } from '@services';
import { CustomerVM, EmailManual } from '@view-models';

@ApiBearerAuth('JWT')
@ApiTags('Email')
@Controller('/api/v1/Email')
export class EmailController {
    constructor(
        protected service: EmailService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Send email to Customer' })
    @ApiCreatedResponse({ description: 'Success send email to Customer' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public insert(@Body() ids: string[]): Promise<string> {
        return this.service.sendEmailCustomer(ids);
    }

    @Post('/sendManual')
    @ApiOperation({ summary: 'Send email to Customer' })
    @ApiCreatedResponse({ description: 'Success send email to Customer' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public sendManualEmail(@Body() emailManual: EmailManual): Promise<string> {
        return this.service.sendManualEmailCustomer(emailManual);
    }
}
