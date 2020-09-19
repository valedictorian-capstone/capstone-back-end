import { AccountWFStepInstanceVM } from "./account-work-flow-step-instance.view-model";
import { CommentVM } from "./comment.view-model";
import { CustomerWFStepInstanceVM } from "./customer-work-flow--step-instance.view-model";
import { FormDataVM } from "../form-view-models/form-data.view-model";

export class WFStepInstanceVM {
  public readonly Id!: string;
  public readonly Status!: string;
  public readonly Note!: string;
  public readonly WFStepId!: string;
  public readonly WFInstanceId!: string;
  public readonly CommentVMs!: CommentVM[];
  public readonly CustomerWFStepInstanceVMs!: CustomerWFStepInstanceVM[];
  public readonly AccountWFStepInstanceVMs!: AccountWFStepInstanceVM[];
  public readonly FormDataVMs!: FormDataVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class WFStepInstanceCM {
  public readonly Status!: string;
  public readonly Note!: string;
  public readonly WFStepId!: string;
  public readonly WFInstanceId!: string;
}

export class WFStepInstanceUM {
  public readonly Id!: string;
  public readonly Status!: string;
  public readonly Note!: string;
  public readonly WFStepId!: string;
  public readonly WFInstanceId!: string;
}