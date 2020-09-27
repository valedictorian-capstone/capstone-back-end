
import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { AccountExtraValueVM } from "./account-extra-value.view-model";

export class AccountExtraInformationVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly name: string;

  @AutoMap()
  public readonly type: string;

  @AutoMap()
  public readonly subType: string;

  @AutoMap()
  public readonly options: string;

  @AutoMap()
  public readonly placeHolder: string;

  @AutoMap()
  public readonly tooltip: string;

  public accountExtraValues: AccountExtraValueVM[];

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

export class AccountExtraInformationCM {
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly name: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly type: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly subType: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly options: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly placeHolder: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly tooltip: string;
  
}

export class AccountExtraInformationUM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly name: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly type: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly subType: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly options: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly placeHolder: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly tooltip: string;
}