import { CustomerGroupVM , CustomerGroupUM, CustomerGroupCM } from 'src/app/view-models';

export interface ICustomerGroupController {
    readonly findAll: () => Promise<CustomerGroupVM[]>;
    readonly findById: (id: string) => Promise<CustomerGroupVM>;
    readonly insert: (body: CustomerGroupCM) => Promise<CustomerGroupVM>;
    readonly update: (body: CustomerGroupUM) => Promise<CustomerGroupVM>;
    readonly remove: (id: string) => Promise<CustomerGroupVM>;
    readonly active: (id: string) => Promise<CustomerGroupVM>;
    readonly deactive: (id: string) => Promise<CustomerGroupVM>;
}