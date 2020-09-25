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
}