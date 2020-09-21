import { CustomerExtraInformationVM } from "./customer-extra-information.view-model";
import { CustomerExtraDataVM } from './customer-extra-data.view-model';
import { CustomerWFStepInstanceVM } from "../bpmn-view-models";
import { CustomerGroupVM } from "./customer-group.view-model";

export class CustomerVM {
  public readonly id: string;
  public readonly phone: string;
  public readonly email: string;
  public readonly code: string;
  public readonly fullname: string;
  public readonly avatar: string;
  public readonly address: string;
  public readonly gender: string;
  public readonly customerExtraInformationVMs: CustomerExtraInformationVM[];
  public readonly customerGroupVMs: CustomerGroupVM[];
  public readonly customerExtraDataVMs: CustomerExtraDataVM[];
  public readonly customerWFStepInstanceVMs: CustomerWFStepInstanceVM[];
  public readonly isDelete: boolean;
  public readonly createdBy: string;
  public readonly updatedBy: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export class CustomerCM {
  public readonly phone: string;
  public readonly email: string;
  public readonly code: string;
  public readonly fullname: string;
  public readonly avatar: string;
  public readonly address: string;
  public readonly gender: string;
  public readonly passwordHash: string;
}

export class CustomerUM {
  public readonly id: string;
  public readonly phone: string;
  public readonly email: string;
  public readonly code: string;
  public readonly fullname: string;
  public readonly avatar: string;
  public readonly address: string;
  public readonly gender: string;
  public readonly passwordHash: string;
}