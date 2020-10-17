import { AuthController } from './auth.controller';
import { NotificationController } from './notification.controller';
export * from './auth.controller';
export * from './notification.controller'
export const EXTRA_CONTROLLERS = [AuthController, NotificationController];