import { AccountVM, AccountUM, AccountCM } from 'src/app/view-models';

export interface IAccountController {
  readonly findAll: () => Promise<AccountVM[]>;
  readonly findById: (id: string) => Promise<AccountVM>;
  readonly insert: (body: AccountCM) => Promise<AccountVM>;
  readonly update: (body: AccountUM) => Promise<AccountVM>;
  readonly remove: (id: string) => Promise<AccountVM>;
  readonly active: (id: string) => Promise<AccountVM>;
  readonly deactive: (id: string) => Promise<AccountVM>;
}
