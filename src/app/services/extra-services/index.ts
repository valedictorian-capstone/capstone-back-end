import {
  AuthService,
  FirebaseService
} from '.'

export * from './auth.service'
export * from './firebase.service'

export const EXTRA_SERVICES = [
  AuthService,
  FirebaseService.inject
]