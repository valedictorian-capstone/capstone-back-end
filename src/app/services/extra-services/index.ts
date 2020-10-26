import {
    AuthService,
    EmailService,
    SMSService,
    FirebaseService
} from '.'

export * from './auth.service';
export * from './firebase.service';
export * from './email.service';
export * from './sms.service';

export const EXTRA_SERVICES = [
    AuthService,
    EmailService,
    SMSService,
    FirebaseService.inject,
    EmailService
]