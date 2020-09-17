import { WorkFlowVM, WorkFlowCM, WorkFlowUM } from "src/app/view-models";

export interface IWorkFlowController {
    readonly findAll: () => Promise<WorkFlowVM[]>;
    readonly findById: (id: string) => Promise<WorkFlowVM>;
    readonly insert: (body: WorkFlowCM) => Promise<WorkFlowVM>;
    readonly update: (body: WorkFlowUM) => Promise<WorkFlowVM>;
    readonly remove: (id: string) => Promise<WorkFlowVM>;
    readonly active: (id: string) => Promise<WorkFlowVM>;
    readonly deactive: (id: string) => Promise<WorkFlowVM>;
}