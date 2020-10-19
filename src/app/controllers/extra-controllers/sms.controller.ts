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
import { SMSService } from '@services';

@ApiBearerAuth('JWT')
@ApiTags('SMS')
@Controller('/api/v1/SMS')
export class SMSController {
    constructor(
        protected service: SMSService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Send SMS to Customer' })
    @ApiCreatedResponse({ description: 'Success send SMS to Customer' })
    @ApiBadRequestResponse({ description: 'Have error in run time' })
    public insert(@Body() ids: string[]): Promise<string> {
        return this.service.sendSMSCustomer(ids);
    }
}
