import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';
import { AccountWFStepInstanceVM, CommentVM } from '../bpmn-view-models';
import { AccountExtraInformationVM } from './account-extra-information.view-model';
import { AccountExtraValueVM } from './account-extra-value.view-model';
import { AccountRoleVM } from './account-role.view-model';
import { DepartmentVM } from './department.view-model';
import { RoleVM } from './role.view-model';

export class AccountVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly phone: string;

  @AutoMap()
  public readonly email: string;

  @AutoMap()
  public readonly code: string;

  @AutoMap()
  public readonly fullname: string;

  @AutoMap()
  public readonly avatar: string;

  @AutoMap()
  public readonly address: string;

  @AutoMap()
  public readonly gender: string;

  public readonly currentValidateCode: string;

  @AutoMap()
  public readonly position: string;

  public readonly roles: RoleVM[];
  
  public readonly departments: DepartmentVM[];

  @AutoMap()
  public readonly accountExtraInformationVMs: AccountExtraInformationVM[];

  @AutoMap()
  public readonly AccountRoleVMs: AccountRoleVM[];

  public readonly accountExtraValues: AccountExtraValueVM[];

  @AutoMap()
  public readonly accountWFStepInstanceVMs: AccountWFStepInstanceVM[];

  @AutoMap()
  public readonly commentVMs: CommentVM[];

  @AutoMap()
  public readonly isDelete: boolean;

  @AutoMap()
  public readonly createdBy: string;

  @AutoMap()
  public readonly updatedBy: string;

  @AutoMap()
  public readonly createdAt: Date;

  @AutoMap()
  public readonly updatedAt: Date;
}

export class AccountCM {

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 10, pattern: "(\(\d{2,4}\)\s{0,1}\d{6,9})$|^\d{8,13}$|^\d{3,5}\s?\d{3}\s?\d{3,4}$|^[\d\(\)\s\-\/]{6,}" })
  public readonly phone: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 8, pattern: "[a-zA-Z0-9.#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*" })
  public readonly email: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly code: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly fullname: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly avatar: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly address: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly gender: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 6 })
  public readonly password: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly position: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly roleName: string[];
}

export class AccountUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'string', minLength: 10, pattern: "(\(\d{2,4}\)\s{0,1}\d{6,9})$|^\d{8,13}$|^\d{3,5}\s?\d{3}\s?\d{3,4}$|^[\d\(\)\s\-\/]{6,}" })
  public readonly phone: string;

  @ApiProperty({ required: true, format: 'string', minLength: 8, pattern: "[a-zA-Z0-9.#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*" })
  public readonly email: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly code: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly fullname: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly avatar: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly address: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly gender: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Position: string;
}