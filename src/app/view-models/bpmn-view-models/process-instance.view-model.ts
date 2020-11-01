import { ProcessStepInstanceVM } from "./process-step-instance.view-model";

export class ProcessInstanceVM {
  public readonly id!: string;
  public readonly code!: string;
  public readonly processId!: string;
  public readonly note!: string;
  public readonly processStepInstanceVMs!: ProcessStepInstanceVM[];
  public readonly isDelete!: boolean;
  public readonly createdBy!: string;
  public readonly updatedBy!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  constructor(props: Partial<ProcessInstanceVM>) {
    Object.assign(this, props);
  }
}

export class ProcessInstanceCM {
  public readonly code!: string;
  public readonly processId!: string;
  public readonly note!: string;
}

export class ProcessInstanceUM {
  public readonly id!: string;
  public readonly code!: string;
  public readonly processId!: string;
  public readonly note!: string;
}