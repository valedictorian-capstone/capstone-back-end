import { AccountRoleVM, AccountRoleUM, AccountRoleCM } from 'src/app/view-models';

export interface IAccountRoleController {
    readonly findAll: () => Promise<AccountRoleVM[]>;
    readonly findById: (id: string) => Promise<AccountRoleVM>;
    readonly insert: (body: AccountRoleCM) => Promise<AccountRoleVM>;
    readonly update: (body: AccountRoleUM) => Promise<AccountRoleVM>;
    readonly remove: (id: string) => Promise<AccountRoleVM>;
    readonly active: (id: string) => Promise<AccountRoleVM>;
    readonly deactive: (id: string) => Promise<AccountRoleVM>;
}
