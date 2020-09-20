import { AccountWFStepInstanceVM } from "./account-work-flow-step-instance.view-model";
import { CommentVM } from "./comment.view-model";
import { CustomerWFStepInstanceVM } from "./customer-work-flow--step-instance.view-model";
import { FormDataVM } from "../form-view-models/form-data.view-model";

export class WFStepInstanceVM {
  public readonly id!: string;
  public readonly status!: string;
  public readonly note!: string;
  public readonly wFStepId!: string;
  public readonly wFInstanceId!: string;
  public readonly commentVMs!: CommentVM[];
  public readonly customerWFStepInstanceVMs!: CustomerWFStepInstanceVM[];
  public readonly accountWFStepInstanceVMs!: AccountWFStepInstanceVM[];
  public readonly formDataVMs!: FormDataVM[];
  public readonly isDelete!: boolean;
  public readonly createdBy!: string;
  public readonly updatedBy!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export class WFStepInstanceCM {
  public readonly status!: string;
  public readonly note!: string;
  public readonly wFStepId!: string;
  public readonly wFInstanceId!: string;
}

export class WFStepInstanceUM {
  public readonly id!: string;
  public readonly status!: string;
  public readonly note!: string;
  public readonly wFStepId!: string;
  public readonly wFInstanceId!: string;
}