import { CustomerExtraInformationVM } from "./customer-extra-information.view-model";
import { CustomerExtraDataVM } from './customer-extra-data.view-model';
import { CustomerWorkFlowStepInstanceVM } from "../bpmn-view-models";
import { CustomerGroupVM } from "./customer-group.view-model";

export class CustomerVM {
  public readonly Id!: string;
  public readonly Phone!: string;
  public readonly Email!: string;
  public readonly Code!: string;
  public readonly Fullname!: string;
  public readonly Avatar!: string;
  public readonly Address!: string;
  public readonly Gender!: string;
  public readonly CustomerExtraInformationVMs!: CustomerExtraInformationVM[];
  public readonly CustomerGroupVMs!: CustomerGroupVM[];
  public readonly CustomerExtraDataVMs!: CustomerExtraDataVM[];
  public readonly CustomerWorkFlowStepInstanceVMs!: CustomerWorkFlowStepInstanceVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class CustomerCM {
  public readonly Phone!: string;
  public readonly Email!: string;
  public readonly Code!: string;
  public readonly Fullname!: string;
  public readonly Avatar!: string;
  public readonly Address!: string;
  public readonly Gender!: string;
  public readonly PasswordHash!: string;
}

export class CustomerUM {
  public readonly Id!: string;
  public readonly Phone!: string;
  public readonly Email!: string;
  public readonly Code!: string;
  public readonly Fullname!: string;
  public readonly Avatar!: string;
  public readonly Address!: string;
  public readonly Gender!: string;
  public readonly PasswordHash!: string;
}