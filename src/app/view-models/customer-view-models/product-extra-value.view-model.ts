import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";

import { ProductExtraInformationVM } from "./product-extra-information.view-model";
import { ProductVM } from "./product.view-model";

export class ProductExtraValueVM {
  
  @AutoMap()
  public readonly id: string;
  
  @AutoMap()
  public readonly value: string;

  public product: ProductVM;
  
  public productExtraInformation: ProductExtraInformationVM;
  
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

export class ProductExtraValueCM {

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly value: string;

}

export class ProductExtraValueUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly value: string;
}