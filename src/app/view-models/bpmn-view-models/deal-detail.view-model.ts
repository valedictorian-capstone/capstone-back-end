import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from 'nestjsx-automapper';
import { ProductVM } from "../product-view-models";
import { DealVM } from "./deal.view-model";

export class DealDetailVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly quantity: number;

  public readonly deal: DealVM;

  public readonly product: ProductVM;

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

export class DealDetailCM {

  @ApiProperty()
  public readonly deal: {id : string};
  
  @ApiProperty()
  public readonly product: {id : string};

  @AutoMap()
  @ApiProperty({ required: true, format: 'number'})
  public readonly quantity: number;

  @AutoMap()
  @ApiProperty({ required: true, format: 'number'})
  public readonly currentStep: number;

}

export class DealDetailUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty()
  public readonly deal: {id : string};
  
  @ApiProperty()
  public readonly product: {id : string};

  @AutoMap()
  @ApiProperty({ required: true, format: 'number'})
  public readonly quantity: number;

  @AutoMap()
  @ApiProperty({ required: true, format: 'number'})
  public readonly currentStep: number;
}
