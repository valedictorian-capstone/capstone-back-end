
import { AuthController, EmailController, NotificationController, SMSController } from '.';
export * from './auth.controller';
export * from './email.controller';
export * from './notification.controller';
export * from './sms.controller';
export const EXTRA_CONTROLLERS = [AuthController, EmailController, NotificationController, SMSController];

