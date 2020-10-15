import { AutoMap } from "nestjsx-automapper";
import { ApiProperty } from "@nestjs/swagger";
import { AccountVM } from ".";
import { ExtraInformationVM } from "../basic-view-models";

export class AccountExtraInformationDataVM {

  @AutoMap()
  public readonly id: string;

  public readonly extraInformation: ExtraInformationVM;

  public readonly account: AccountVM;

  @AutoMap()
  public readonly value: string;

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

export class AccountExtraInformationDataCM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly accountExtraInformationId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly accountExtraDataId: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly value: string;
}

export class AccountExtraInformationDataUM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly accountExtraInformationId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly accountExtraDataId: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly value: string;
}