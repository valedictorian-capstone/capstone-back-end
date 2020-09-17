import { AccountRoleVM } from './account-role.view-model';
import { AccountExtraInformationVM } from "./account-extra-information.view-model";
import { AccountExtraDataVM } from './account-extra-data.view-model';
import { AccountDepartmentVM } from './account-department.view-model';
import { CommentVM, AccountWorkFlowStepInstanceVM } from '../bpmn-view-models';
import { ApiProperty } from '@nestjs/swagger';

export class AccountVM {

  public readonly Id: string;

  public readonly Phone: string;

  public readonly Email: string;

  public readonly Code: string;

  public readonly Fullname: string;

  public readonly Avatar: string;

  public readonly Address: string;

  public readonly Gender: string;

  public readonly CurrentValidateCode: string;

  public readonly Position: string;

  public readonly AccountExtraInformationVMs: AccountExtraInformationVM[];

  public readonly AccountRoleVMs: AccountRoleVM[];
  public readonly AccountExtraDataVMs: AccountExtraDataVM[];
  public readonly AccountDepartmentVMs: AccountDepartmentVM[];
  public readonly AccountWorkFlowStepInstanceVMs: AccountWorkFlowStepInstanceVM[];
  public readonly CommentVMs: CommentVM[];

  public readonly IsDelete: boolean;

  public readonly CreatedBy: string;

  public readonly UpdatedBy: string;

  public readonly CreatedAt: Date;

  public readonly UpdatedAt: Date;

  constructor(props: Partial<AccountVM>) {
    Object.assign(this, props);
  }
}

export class AccountCM {

  @ApiProperty({ required: true, format: 'string', minLength: 10, pattern: "(\(\d{2,4}\)\s{0,1}\d{6,9})$|^\d{8,13}$|^\d{3,5}\s?\d{3}\s?\d{3,4}$|^[\d\(\)\s\-\/]{6,}"})
  public readonly Phone: string;

  @ApiProperty({ required: true, format: 'string', minLength: 8, pattern: "[a-zA-Z0-9.#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"})
  public readonly Email: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Code: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Fullname: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Avatar: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Address: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Gender: string;

  @ApiProperty({ required: true, format: 'string', minLength: 6 })
  public readonly Password: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Position: string;
}

export class AccountUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly Id: string;

  @ApiProperty({ required: true, format: 'string', minLength: 10, pattern: "(\(\d{2,4}\)\s{0,1}\d{6,9})$|^\d{8,13}$|^\d{3,5}\s?\d{3}\s?\d{3,4}$|^[\d\(\)\s\-\/]{6,}"})
  public readonly Phone: string;

  @ApiProperty({ required: true, format: 'string', minLength: 8, pattern: "[a-zA-Z0-9.#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"})
  public readonly Email: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Code: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Fullname: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Avatar: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Address: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Gender: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Position: string;
}