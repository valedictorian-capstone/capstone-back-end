
import { AuthController, EmailController, NotificationController } from '.';
export * from './auth.controller';
export * from './email.controller';
export * from './notification.controller'
export const EXTRA_CONTROLLERS = [AuthController, EmailController, NotificationController];

