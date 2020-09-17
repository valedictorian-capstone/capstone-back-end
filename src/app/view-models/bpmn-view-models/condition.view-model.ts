import { WorkFlowConditionVM } from "./work-flow-condition.view-model";

export class ConditionVM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Value!: string;
  public readonly WorkFlowConditionVMs!: WorkFlowConditionVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class ConditionCM {
  public readonly Name!: string;
  public readonly Value!: string;
}

export class ConditionUM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Value!: string;
}