import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';
import { AccountExtraInformationVM } from './account-extra-information.view-model';
import { AccountVM } from './account.view-model';


export class AccountExtraValueVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly value: string;

  public readonly accountExtraInformation: AccountExtraInformationVM;

  public readonly account: AccountVM;

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

export class AccountExtraValueCM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly accountId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly accountExtraInformationId: string;

  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly value: string;
  
}

export class AccountExtraValueUM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly value: string;
}