import { RoleVM } from './role.view-model';
import { AccountRoleVM } from './account-role.view-model';
import { AccountExtraInformationVM } from "./account-extra-information.view-model";
import { AccountExtraDataVM } from './account-extra-data.view-model';
import { AccountDepartmentVM } from './account-department.view-model';
import { CommentVM, AccountWorkFlowStepInstanceVM } from '../bpmn-view-models';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

export class AccountVM {

  @AutoMap()
  public readonly Id: string;

  @AutoMap()
  public readonly Phone: string;

  @AutoMap()
  public readonly Email: string;

  @AutoMap()
  public readonly Code: string;

  @AutoMap()
  public readonly Fullname: string;

  @AutoMap()
  public readonly Avatar: string;

  @AutoMap()
  public readonly Address: string;

  @AutoMap()
  public readonly Gender: string;

  @AutoMap()
  public readonly CurrentValidateCode: string;

  @AutoMap()
  public readonly Position: string;

  @AutoMap()
  public readonly Roles: RoleVM[];
  // @AutoMap()
  // public readonly AccountExtraInformationVMs: AccountExtraInformationVM[];

  // @AutoMap()
  // public readonly AccountRoleVMs: AccountRoleVM[];
  // @AutoMap()
  // public readonly AccountExtraDataVMs: AccountExtraDataVM[];
  // @AutoMap()
  // public readonly AccountDepartmentVMs: AccountDepartmentVM[];
  // @AutoMap()
  // public readonly AccountWorkFlowStepInstanceVMs: AccountWorkFlowStepInstanceVM[];
  // @AutoMap()
  // public readonly CommentVMs: CommentVM[];

  @AutoMap()
  public readonly IsDelete: boolean;

  @AutoMap()
  public readonly CreatedBy: string;

  @AutoMap()
  public readonly UpdatedBy: string;

  @AutoMap()
  public readonly CreatedAt: Date;

  @AutoMap()
  public readonly UpdatedAt: Date;
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