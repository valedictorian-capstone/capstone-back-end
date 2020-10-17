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
}
