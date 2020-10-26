import { AuthController, EmailController, NotificationController, SMSController, FileController } from '.';
export * from './auth.controller';
export * from './email.controller';
export * from './notification.controller';
export * from './sms.controller';
export * from './file.controller';
export const EXTRA_CONTROLLERS = [
  AuthController,
  EmailController,
  NotificationController,
  SMSController,
  FileController,
];

