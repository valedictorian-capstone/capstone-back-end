import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { CustomerExtraInformationDataVM } from "./customer-extra-information-data.view-model";
import { CustomerVM } from "./customer.view-model";

export class CustomerExtraInformationVM {
  
  @AutoMap()
  public readonly id: string;
  
  @AutoMap()
  public readonly name: string;
  
  @AutoMap()
  public readonly customerId: string;
  
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

export class CustomerExtraInformationCM {
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly name: string;
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly type: string;
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly subType: string;
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly options: string;
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly placeHolder: string;
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly tooltip: string;
}

export class CustomerExtraInformationUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly name: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly type: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly subType: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly options: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly placeHolder: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly tooltip: string;

  @ApiProperty({ required: true, format: 'boolean', default: true})
  public readonly isDelete: boolean;
}