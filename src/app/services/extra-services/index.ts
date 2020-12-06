import {
    AuthService,
    EmailService,
    SMSService,
    FirebaseService,
    SearchService,
    StatisticService,
    SocketService
} from '.'

export * from './auth.service';
export * from './firebase.service';
export * from './email.service';
export * from './sms.service';
export * from './search.service';
export * from './socket.service';
export * from './statistic.service';

export const EXTRA_SERVICES = [
    AuthService,
    EmailService,
    SMSService,
    FirebaseService.inject,
    SearchService,
    StatisticService,
    SocketService.inject
]