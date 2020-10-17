
import {
  AuthService,
  FirebaseService,
  EmailService
} from '.'

export * from './auth.service'
export * from './firebase.service'
export * from './email.service'

export const EXTRA_SERVICES = [
  AuthService,
  FirebaseService.inject,
  EmailService
]