import {
    AuthService,
    EmailService,
    SMSService,
    FirebaseService,
    SearchService
} from '.'

export * from './auth.service';
export * from './firebase.service';
export * from './email.service';
export * from './sms.service';
export * from './search.service';

export const EXTRA_SERVICES = [
    AuthService,
    EmailService,
    SMSService,
    FirebaseService.inject,
    SearchService
]