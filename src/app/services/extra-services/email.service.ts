
import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '@models';
import { CustomerExtraInformationDataRepository, ExtraInformationRepository, CustomerRepository } from '@repositories';
import { CUSTOMER_EXTRA_INFORMATION_DATA_REPOSITORY, EXTRA_INFORMATION_REPOSITORY, CUSTOMER_REPOSITORY } from '@types';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';
import { createTransport } from 'nodemailer';
 
@Injectable()
export class EmailService {
    constructor(
        @Inject(CUSTOMER_REPOSITORY) protected readonly cusomterRepository: CustomerRepository,
        @Inject(EXTRA_INFORMATION_REPOSITORY) protected readonly extraInformationRepository: ExtraInformationRepository,
        @Inject(CUSTOMER_EXTRA_INFORMATION_DATA_REPOSITORY) protected readonly cusomterExtrDataRepository: CustomerExtraInformationDataRepository,
        @InjectMapper() protected readonly mapper: AutoMapper,
    ) { }

    public readonly sendEmailCustomer = async (ids: string[]): Promise<string> => {
        const transporter = createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'crmdynamic123@gmail.com',
                pass: '123456crm'
            }
        });
        return await this.cusomterRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}) })
            .then(async (models) => {
                console.log(models)
                for (const model of models) {
                    transporter.sendMail(this.getDemoTemplate(model), (err, info) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Message sent: ' + info.response);
                        }
                    })
                }
                return "OK";
            }).catch(err => err);
    }

    private getDemoTemplate(customer: Customer) {
        return {
            from: 'CRM Capstone',
            to: customer.email,
            subject: 'Tri ân khách hàng',
            text: 'You recieved message from ',
            html: '<p>Dear ' + customer.fullname + ',</p></b><p>Best regard,</p></b><p>CRM</p>'
        }
    };


}