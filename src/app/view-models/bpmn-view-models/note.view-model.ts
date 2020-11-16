import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from 'nestjsx-automapper';
import { DealVM } from "./deal.view-model";

export class NoteVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly description: string;

  public readonly deal: DealVM;

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

export class NoteCM {

  @ApiProperty()
  public readonly deal: {id : string};

  @AutoMap()
  @ApiProperty({ required: true, format: 'string'})
  public readonly quantity: string;


}

export class NoteUM {

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
