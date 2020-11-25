
import { Inject, Injectable } from '@nestjs/common';
import { Customer, Event } from '@models';
import { CustomerRepository } from '@repositories';
import { CUSTOMER_REPOSITORY } from '@types';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';
import { createTransport } from 'nodemailer';
import { EmailManual } from '@view-models';

@Injectable()
export class EmailService {
    constructor(
        @Inject(CUSTOMER_REPOSITORY) protected readonly cusomterRepository: CustomerRepository,
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

    public readonly sendEventCustomer = async (customers: Customer[], event: Event): Promise<string> => {
        const transporter = createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'crmdynamic123@gmail.com',
                pass: '123456crm'
            }
        });
        for (let index = 0; index < customers.length; index++) {
            const customer = customers[index];
            transporter.sendMail(this.getEventTemplate(customer, event), (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            })

        };
        return "OK";
    }

    public readonly sendManualEmailCustomer = async (emailManual: EmailManual): Promise<any> => {
        const transporter = createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'crmdynamic123@gmail.com',
                pass: '123456crm'
            }
        });
        await transporter.sendMail(this.getManualMailTemplate(emailManual.info.email, emailManual.subject, emailManual.content), (err, info) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                console.log(info);
                return "OK";
            }
        })
    }

    public readonly sendHappyBirtdayEmailCustomer = async (customers: []): Promise<string> => {
        const transporter = createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'crmdynamic123@gmail.com',
                pass: '123456crm'
            }
        });
        let countSuccess = 0;
        for (let i = 0; i < customers.length; i++) {
            await transporter.sendMail(this.getHappyBirthdayTemplate(customers[i])), (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(info);
                    countSuccess++;
                }
            }
        }
        return "Send happy birthday mail" + countSuccess;
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

    private getManualMailTemplate(to: string, subject: string, content: string) {
        return {
            from: 'CRM Capstone',
            to: to,
            subject: subject,
            text: 'You recieved message from ',
            html: content
        }
    };

    private getHappyBirthdayTemplate(customer: Customer) {
        return {
            from: 'CRM Capstone',
            to: customer.email,
            subject: 'Chúc mừng sinh nhật',
            text: 'You recieved message from ',
            html: '<p>Kính gửi ' + customer.fullname + '</p><p><br></p><p>Cám ơn bạn đã đồng hành với công ty. </p><p>Chúc bạn có một sinh nhật thật vui vẻ với những người thân thương</p><p><br></p><p>Trân trọng</p>'
        }
    };

    private getEventTemplate(customer: Customer, event: Event) {
        return {
            from: 'CRM Capstone',
            to: customer.email,
            subject: event.name,
            text: 'You recieved message from ',
            html: '<p>Dear ' + customer.fullname + ',</p></b>' + event.description + '<p>Best regard,</p></b><p>CRM</p>'
        }
    };
}