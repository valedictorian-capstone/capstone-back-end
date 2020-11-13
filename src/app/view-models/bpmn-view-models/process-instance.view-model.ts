import { Customer } from "@models";
import { AutoMap } from 'nestjsx-automapper';
import { ProcessVM } from ".";
import { CustomerVM } from "../customer-view-models";

export class ProcessInstanceVM {
  @AutoMap()
  public readonly id: string;
  @AutoMap()
  public readonly code: string;
  public readonly process: ProcessVM;
  public readonly customer: CustomerVM;
  @AutoMap()
  public readonly description: string;
  @AutoMap()
  public readonly isDelete: boolean;
  @AutoMap()
  public readonly createdBy: string;
  @AutoMap()
  public readonly updatedBy: string;
  @AutoMap()
  public readonly createdAt: Date;
  @AutoMap()
  public readonly updatedAt: Date;
}

export class ProcessInstanceCM {
  @AutoMap()
  public readonly code: string;
  public readonly process: ProcessVM;
  public readonly customer: Customer;
  @AutoMap()
  public readonly description: string;
}

export class ProcessInstanceUM {
  @AutoMap()
  public readonly id: string;
  @AutoMap()
  public readonly code: string;
  public readonly process: ProcessVM;
  public readonly customer: Customer;
  @AutoMap()
  public readonly description: string;
}

export class ProcessInstanceFilter {
  public readonly customerId?: string;
  public readonly processId?: string;
}