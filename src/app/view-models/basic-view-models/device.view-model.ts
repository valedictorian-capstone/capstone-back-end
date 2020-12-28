import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { EmployeeVM } from "../employee-view-models";
import { CustomerVM } from "../customer-view-models";

export class DeviceVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly browser: string;

  @AutoMap()
  public readonly browserVersion: string;

  @AutoMap()
  public readonly os: string;

  @AutoMap()
  public readonly osVersion: string;

  @AutoMap()
  public readonly userAgent: string;

  @AutoMap()
  public readonly env: string;

  public readonly employee: EmployeeVM;

  public readonly customer: CustomerVM;

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
export class DeviceCM {

  
  @ApiProperty()
  public readonly id: string;

  @ApiProperty()
  public readonly browser: string;

  @ApiProperty()
  public readonly browserVersion: string;

  @ApiProperty()
  public readonly os: string;

  @ApiProperty()
  public readonly osVersion: string;

  @ApiProperty()
  public readonly userAgent: string;

  @ApiProperty()
  public readonly env: string;

  public readonly employee: EmployeeVM;

  public readonly customer: CustomerVM;

}

export class DeviceUM {

  
  @ApiProperty()
  public readonly id: string;

  @ApiProperty()
  public readonly browser: string;

  @ApiProperty()
  public readonly browserVersion: string;

  @ApiProperty()
  public readonly os: string;

  @ApiProperty()
  public readonly osVersion: string;

  @ApiProperty()
  public readonly userAgent: string;

  @ApiProperty()
  public readonly env: string;

  public readonly employee: EmployeeVM;

  public readonly customer: CustomerVM;

}