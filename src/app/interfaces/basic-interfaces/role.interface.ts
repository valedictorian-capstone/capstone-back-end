import { RoleVM, RoleCM, RoleUM } from "src/app/dtos";

export interface IRoleController {
    readonly findAll: () => Promise<RoleVM[]>;
    readonly findById: (id: string) => Promise<RoleVM>;
    readonly insert: (body: RoleCM) => Promise<RoleVM>;
    readonly update: (body: RoleUM) => Promise<RoleVM>;
    readonly remove: (id: string) => Promise<RoleVM>;
    readonly active: (id: string) => Promise<RoleVM>;
    readonly deactive: (id: string) => Promise<RoleVM>;
}