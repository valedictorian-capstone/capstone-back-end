import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { CategoryVM } from ".";
import { CommentVM } from "../basic-view-models";
import { DealDetailVM } from "../bpmn-view-models/deal-detail.view-model";

export class ProductVM {
  
  @AutoMap()
  public id: string;

  @AutoMap()
  public code: string;
  
  @AutoMap()
  public name: string;

  @AutoMap()
  public type: string;

  @AutoMap()
  public price: number;
  
  @AutoMap()
  public description: string;

  @AutoMap()
  public image: string;

  public parameters: any;

  public category: CategoryVM;

  public dealDetails: DealDetailVM[];

  public comments: CommentVM[];
  
  @AutoMap()
  public isDelete: boolean;
  
  @AutoMap()
  public createdBy: string;
  
  @AutoMap()
  public updatedBy: string;
  
  @AutoMap()
  public createdAt: Date;
  
  @AutoMap()
  public updatedAt: Date;
}

export class ProductCM {

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public code: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public name: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public brand: string;

  @ApiProperty({ required: true, format: 'number' })
  public price: number;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public description: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public image: string;

  public category: CategoryVM;

}

export class ProductUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public id: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public code: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public name: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public brand: string;

  @ApiProperty({ required: true, format: 'number' })
  public price: number;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public description: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public image: string;

  public category: CategoryVM;

}