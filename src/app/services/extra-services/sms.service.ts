import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '@models';
import { CustomerRepository } from '@repositories';
import { CUSTOMER_REPOSITORY } from '@types';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class SMSService {
    constructor(
        @Inject(CUSTOMER_REPOSITORY) protected readonly cusomterRepository: CustomerRepository,
        @InjectMapper() protected readonly mapper: AutoMapper,
    ) { }

    public readonly sendSMSCustomer = async (ids: string[]): Promise<string> => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const Nexmo = require('nexmo');
        const nexmo = new Nexmo({
            apiKey: '7ac47200',
            apiSecret: 'uGU7rCiOLAbIhZQz',
          });
          
          const from = 'Vonage APIs';
          const to = '+84904403502';
          const text = 'Hello from Vonage SMS API';
          nexmo.message.sendSms(from, to, text);

        return "OK";
    }
}