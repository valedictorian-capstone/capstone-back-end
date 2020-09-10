import { WorkFlowInstanceVM, WorkFlowInstanceCM, WorkFlowInstanceUM } from "src/app/dtos";

export interface IWorkFlowInstanceController {
    readonly findAll: () => Promise<WorkFlowInstanceVM[]>;
    readonly findById: (id: string) => Promise<WorkFlowInstanceVM>;
    readonly insert: (body: WorkFlowInstanceCM) => Promise<WorkFlowInstanceVM>;
    readonly update: (body: WorkFlowInstanceUM) => Promise<WorkFlowInstanceVM>;
    readonly remove: (id: string) => Promise<WorkFlowInstanceVM>;
    readonly active: (id: string) => Promise<WorkFlowInstanceVM>;
    readonly deactive: (id: string) => Promise<WorkFlowInstanceVM>;
}