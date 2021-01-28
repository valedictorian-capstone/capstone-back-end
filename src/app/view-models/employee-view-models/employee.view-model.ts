import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';
import { RoleVM } from '.';
import { DeviceVM, NotificationVM } from '../basic-view-models';
import { ActivityVM } from '../bpmn-view-models';
import { TicketVM } from '../product-view-models';
import { DealVM } from '@view-models';

export class EmployeeVM {

  @AutoMap()
  public id: string;

  @AutoMap()
  public phone: string;

  @AutoMap()
  public email: string;

  @AutoMap()
  public code: string;

  @AutoMap()
  public fullname: string;

  @AutoMap()
  public avatar: string;

  @AutoMap()
  public address: string;

  @AutoMap()
  public gender: boolean;

  public roles: RoleVM[];

  public devices: DeviceVM[];

  public activitys: ActivityVM[];

  public notifications: NotificationVM[];

  public tickets: TicketVM[];

  public feedbackTickets: TicketVM[];
  public deals: DealVM[];
  
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

export class EmployeeCM {

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 10, pattern: "(\(\d{2,4}\)\s{0,1}\d{6,9})$|^\d{8,13}$|^\d{3,5}\s?\d{3}\s?\d{3,4}$|^[\d\(\)\s\-\/]{6,}" })
  public phone: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 8, pattern: "[a-zA-Z0-9.#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*" })
  public email: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public code: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public fullname: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public avatar: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public address: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public gender: boolean;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 6 })
  public password: string;

  public roles: string[];

}

export class EmployeeUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public id: string;

  @ApiProperty({ required: true, format: 'string', minLength: 10, pattern: "(\(\d{2,4}\)\s{0,1}\d{6,9})$|^\d{8,13}$|^\d{3,5}\s?\d{3}\s?\d{3,4}$|^[\d\(\)\s\-\/]{6,}" })
  public phone: string;

  @ApiProperty({ required: true, format: 'string', minLength: 8, pattern: "[a-zA-Z0-9.#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*" })
  public email: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public code: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public fullname: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public avatar: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public address: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public gender: boolean;

  public roles: string[];
  
}

export class EmployeeAuthVM {

  @AutoMap()
  public id: string;

  @AutoMap()
  public phone: string;

  @AutoMap()
  public email: string;

  @AutoMap()
  public code: string;

  @AutoMap()
  public password: string;

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

  @AutoMap()
  public deviceId: string;
}

export class EmployeeFilter {
  public roleName?: string;
  public ids?: string[];
  public departmentId: string;
}
