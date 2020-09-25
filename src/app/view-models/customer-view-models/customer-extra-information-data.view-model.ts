import { AutoMap } from "nestjsx-automapper";
import { CustomerExtraInformationVM } from "./customer-extra-information.view-model";
import { CustomerExtraDataVM } from './customer-extra-data.view-model';
import { ApiProperty } from "@nestjs/swagger";

export class CustomerExtraInformationDataVM {

  @AutoMap()
  public readonly id: string;

  public readonly customerExtraInformation: CustomerExtraInformationVM;

  public readonly customerExtraData: CustomerExtraDataVM;

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

export class CustomerExtraInformationDataCM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly customerExtraInformationId: string;
  
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly customerExtraDataId: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly value: string;
}

export class CustomerExtraInformationDataUM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly customerExtraInformationId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly customerExtraDataId: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly value: string;
}