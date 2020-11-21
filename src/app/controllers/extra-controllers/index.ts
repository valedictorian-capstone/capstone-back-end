import { AuthController, EmailController, SMSController, FileController, SearchController } from '.';
export * from './auth.controller';
export * from './email.controller';
export * from './sms.controller';
export * from './search.controller';
export * from './file.controller';
export const EXTRA_CONTROLLERS = [
  AuthController,
  EmailController,
  SMSController,
  FileController,
  SearchController
];

