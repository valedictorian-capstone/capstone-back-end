import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { ProductExtraValueVM } from "./product-extra-value.view-model";
import { ProductVM } from "./product.view-model";

export class ProductExtraInformationVM {
  
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
  public readonly toolTip: string;
  
  public readonly productExtraValues: ProductExtraValueVM[];
  
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

export class ProductExtraInformationCM {

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
  public readonly toolTip: string;
}

export class ProductExtraInformationUM {

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
  public readonly toolTip: string;
}