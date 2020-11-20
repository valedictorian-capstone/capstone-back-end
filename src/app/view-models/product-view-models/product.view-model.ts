import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { CategoryVM } from ".";
import { DealDetailVM } from "../bpmn-view-models/deal-detail.view-model";

export class ProductVM {
  
  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly code: string;
  
  @AutoMap()
  public readonly name: string;

  @AutoMap()
  public readonly type: string;

  @AutoMap()
  public readonly price: number;
  
  @AutoMap()
  public readonly description: string;

  public readonly parameters: any;

  public readonly category: CategoryVM;

  public readonly dealDetails: DealDetailVM[];
  
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

export class ProductCM {

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly code: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly name: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly brand: string;

  @ApiProperty({ required: true, format: 'number' })
  public readonly price: number;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly description: string;

  public readonly category: CategoryVM;

}

export class ProductUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly code: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly name: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly brand: string;

  @ApiProperty({ required: true, format: 'number' })
  public readonly price: number;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly description: string;

  public readonly category: CategoryVM;

}