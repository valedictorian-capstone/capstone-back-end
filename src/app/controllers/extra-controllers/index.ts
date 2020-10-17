import { AuthController, EmailController } from '.';
export * from './auth.controller';
export * from './email.controller'
export const EXTRA_CONTROLLERS = [AuthController, EmailController];