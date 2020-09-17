import { WorkFlowConnectionVM, WorkFlowConnectionCM, WorkFlowConnectionUM } from "src/app/view-models";

export interface IWorkFlowConnectionController {
    readonly findAll: () => Promise<WorkFlowConnectionVM[]>;
    readonly findById: (id: string) => Promise<WorkFlowConnectionVM>;
    readonly insert: (body: WorkFlowConnectionCM) => Promise<WorkFlowConnectionVM>;
    readonly update: (body: WorkFlowConnectionUM) => Promise<WorkFlowConnectionVM>;
    readonly remove: (id: string) => Promise<WorkFlowConnectionVM>;
    readonly active: (id: string) => Promise<WorkFlowConnectionVM>;
    readonly deactive: (id: string) => Promise<WorkFlowConnectionVM>;
}