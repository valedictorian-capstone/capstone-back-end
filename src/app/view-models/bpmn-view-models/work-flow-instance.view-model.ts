<<<<<<< Updated upstream:src/app/view-models/bpmn-view-models/work-flow-instance.view-model.ts
import { WFStepInstanceVM } from "./work-flow-step-instance.view-model";

export class WFInstanceVM {
  public readonly id!: string;
  public readonly code!: string;
  public readonly wFId!: string;
  public readonly note!: string;
  public readonly wFStepInstanceVMs!: WFStepInstanceVM[];
  public readonly isDelete!: boolean;
  public readonly createdBy!: string;
  public readonly updatedBy!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  constructor(props: Partial<WFInstanceVM>) {
    Object.assign(this, props);
  }
}

export class WFInstanceCM {
  public readonly code!: string;
  public readonly wFId!: string;
  public readonly note!: string;
}

export class WFInstanceUM {
  public readonly id!: string;
  public readonly code!: string;
  public readonly wFId!: string;
  public readonly note!: string;
=======
import { ProcessStepInstanceVM } from "./process-step-instance.view-model";
import { AutoMap } from 'nestjsx-automapper';
import { ProcessVM } from ".";
import { Customer } from "@models";

export class ProcessInstanceVM {
  @AutoMap()
  public readonly id: string;
  @AutoMap()
  public readonly code: string;
  public readonly process: ProcessVM;
  public readonly customer: Customer;
  @AutoMap()
  public readonly description: string;
  public readonly processStepInstances: ProcessStepInstanceVM[];
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
>>>>>>> Stashed changes:src/app/view-models/bpmn-view-models/process-instance.view-model.ts
}