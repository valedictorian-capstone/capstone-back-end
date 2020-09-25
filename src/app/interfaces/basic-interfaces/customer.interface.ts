import { CustomerVM, CustomerCM, CustomerUM } from "src/app/view-models";

export interface ICustomerController {
    readonly findAll: () => Promise<CustomerVM[]>;
    readonly findById: (id: string) => Promise<CustomerVM>;
    readonly insert: (body: CustomerCM) => Promise<CustomerVM>;
    readonly update: (body: CustomerUM) => Promise<CustomerVM>;
    readonly remove: (id: string) => Promise<CustomerVM>;
    readonly active: (id: string) => Promise<CustomerVM>;
    readonly deactive: (id: string) => Promise<CustomerVM>;
}