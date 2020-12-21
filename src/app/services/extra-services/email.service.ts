
import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    ) {
        this.auth = createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: 'crmdynamic123@gmail.com',
                clientId: '995040905872-25sb1bet01gs4i226qrv95q4baltjv76.apps.googleusercontent.com',
                clientSecret: 'OS2Qongc4QZ1IX3uN_oamAV8',
                refreshToken: '1//04UP-0J_KmYKbCgYIARAAGAQSNwF-L9IrzdQ7xUZM0bpe8V2kBR7zk0OyJEJ2xuiuaApLjqGqBgNN1m9-QEuzGHzwh5Geo_FXyuI',
            }
        });
     }
    
    private auth = createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: 'crmdynamic123@gmail.com',
            clientId: '995040905872-25sb1bet01gs4i226qrv95q4baltjv76.apps.googleusercontent.com',
            clientSecret: 'OS2Qongc4QZ1IX3uN_oamAV8',
            // accessToken: 'ya29.a0AfH6SMCdHOVcRdNcNcV39v-bsYcOdxZnwBpLUbguA4BCOFkWQAd9-rmJCb_XB1Sj0hESnDpfzf6g0JLc4Mh-Pz48Z8KQcgmGlRPQKdO29lje6EE2bAzXo0CoLguCS8VMjfpGlQSpZdaRnZgfgRGmkz9Nb_PH1mIlLcFldnNPGak',
            refreshToken: '1//04v9fUEqiyQKoCgYIARAAGAQSNwF-L9IrUqqav5cXcP6RW9o9S5pL0LOhidOBTrrCG8x-hkBsxQbrEFRv5QXK_zbN2nVxUiAellg'
        }
    });

    public readonly sendEmailCustomer = async (ids: string[]): Promise<string> => {
        const transporter = this.auth
        return await this.cusomterRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}) })
            .then(async (models) => {
                if (models.length == 0) {
                    throw new NotFoundException("cant found id");
                }   
                console.log(this.auth)
                for (const model of models) {
                    await this.auth.sendMail(this.getDemoTemplate(model), (err, info) => {
                        if ( err ) {
                            throw new InternalServerErrorException(err.message)
                        }
                        return "OK"
                    })
                }
                return "OK";
            });
    }

    public readonly sendEventCustomer = async (customers: Customer[], event: Event): Promise<string> => {
        const transporter = this.auth
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
        const transporter = this.auth
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
        const transporter = this.auth
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