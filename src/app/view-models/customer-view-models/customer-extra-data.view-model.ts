import { CustomerExtraInformationDataVM } from "./customer-extra-information-data.view-model";
import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty } from "@nestjs/swagger";
import { CustomerVM } from "./customer.view-model";


export class CustomerExtraDataVM {
  @AutoMap()
  public readonly id: string;

  public readonly customer: CustomerVM;

  public readonly customerExtraInformationDatas: CustomerExtraInformationDataVM[];

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

export class CustomerExtraDataCM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly customerId: string;
}

export class CustomerExtraDataUM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly customerId: string;
}