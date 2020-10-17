import { 
    AuthService, 
    EmailService 
} from '.'

export * from './auth.service'
export * from './firebase.service'
export * from './email.service'

export const EXTRA_SERVICES = [
    AuthService, 
    EmailService
]