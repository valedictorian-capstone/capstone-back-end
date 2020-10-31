import { WFInstanceVM } from "../bpmn-view-models";
import { AutoMap } from "nestjsx-automapper";
import { ApiProperty } from "@nestjs/swagger";
import { GroupVM } from "../basic-view-models";
import { OrderRequestVM } from "../service-view-models";

export class CustomerVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly phone: string;

  @AutoMap()
  public readonly email: string;

  @AutoMap()
  public readonly code: string;

  @AutoMap()
  public readonly fullname: string;

  @AutoMap()
  public readonly delegate: string;

  @AutoMap()
  public readonly birthDate: Date;

  @AutoMap()
  public readonly type: string;

  @AutoMap()
  public readonly avatar: string;

  @AutoMap()
  public readonly address: string;

  @AutoMap()
  public readonly gender: boolean;

  public groups: GroupVM[];

  public wFInstances: WFInstanceVM[];

  public orderRequests: OrderRequestVM[];

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

export class CustomerCM {

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly phone: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly email: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly code: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly fullname: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly avatar: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly address: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly gender: boolean;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly type: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly delegate: string;

  @ApiProperty({ required: true, format: 'Date' })
  public readonly birthDate: Date;
}

export class CustomerUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly phone: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly email: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly code: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly fullname: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly avatar: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly address: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly gender: boolean;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly type: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly delegate: string;

  @ApiProperty({ required: true, format: 'Date'})
  public readonly birthDate: Date;

}