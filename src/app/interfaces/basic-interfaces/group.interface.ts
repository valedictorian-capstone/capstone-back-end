import { GroupVM, GroupCM, GroupUM } from "src/app/view-models";

export interface IGroupController {
    readonly findAll: () => Promise<GroupVM[]>;
    readonly findById: (id: string) => Promise<GroupVM>;
    readonly insert: (body: GroupCM) => Promise<GroupVM>;
    readonly update: (body: GroupUM) => Promise<GroupVM>;
    readonly remove: (id: string) => Promise<GroupVM>;
    readonly active: (id: string) => Promise<GroupVM>;
    readonly deactive: (id: string) => Promise<GroupVM>;
}