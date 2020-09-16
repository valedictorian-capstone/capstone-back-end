import { AuthTM, AuthVM, AuthCM } from 'src/app/dtos';

export interface IAuthController {
    readonly authorized: () => Promise<AuthVM>;
    readonly login: (body: AuthCM) => Promise<AuthTM>;
}
