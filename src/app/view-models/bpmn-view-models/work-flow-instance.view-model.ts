import { WFStepInstanceVM } from "./work-flow-step-instance.view-model";

export class WFInstanceVM {
  public readonly Id!: string;
  public readonly Code!: string;
  public readonly WFId!: string;
  public readonly Note!: string;
  public readonly WFStepInstanceVMs!: WFStepInstanceVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;

  constructor(props: Partial<WFInstanceVM>) {
    Object.assign(this, props);
  }
}

export class WFInstanceCM {
  public readonly Code!: string;
  public readonly WFId!: string;
  public readonly Note!: string;
}

export class WFInstanceUM {
  public readonly Id!: string;
  public readonly Code!: string;
  public readonly WFId!: string;
  public readonly Note!: string;
}