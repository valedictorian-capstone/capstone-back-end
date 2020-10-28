import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { OrderRequestVM } from "./order-request.view-model";


export class ServiceVM {
  
  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly code: string;
  
  @AutoMap()
  public readonly name: string;

  @AutoMap()
  public readonly brand: string;

  @AutoMap()
  public readonly price: string;
  
  @AutoMap()
  public readonly description: string;

  public readonly orderRequests: OrderRequestVM[];
  
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

export class ServiceCM {

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly code: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly name: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly brand: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly price: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly description: string;

}

export class ServiceUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly code: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly name: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly brand: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly price: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly description: string;

}