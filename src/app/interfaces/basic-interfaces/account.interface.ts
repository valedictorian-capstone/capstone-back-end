import { AccountVM, AccountUM, AccountCM } from 'src/app/dtos';

export interface IAccountController {
  readonly findAll: () => Promise<AccountVM[]>;
  readonly findById: (id: string) => Promise<AccountVM>;
  readonly findByUsername: (username: string) => Promise<AccountVM>;
  readonly findByEmail: (email: string) => Promise<AccountVM>;
  readonly findByPhone: (phone: string) => Promise<AccountVM>;
  readonly insert: (body: AccountCM) => Promise<AccountVM>;
  readonly update: (body: AccountUM) => Promise<AccountVM>;
  readonly remove: (id: string) => Promise<AccountVM>;
  readonly active: (id: string) => Promise<AccountVM>;
  readonly deactive: (id: string) => Promise<AccountVM>;
}
