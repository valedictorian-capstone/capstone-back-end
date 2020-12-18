import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { AccountVM } from ".";

export class RoleVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly name: string;

  @AutoMap()
  public readonly level: number;

  @AutoMap()
  public readonly canAccessDeal: boolean;

  @AutoMap()
  public readonly canGetAllDeal: boolean;

  @AutoMap()
  public readonly canGetFeedbackDeal: boolean;

  @AutoMap()
  public readonly canGetAssignDeal: boolean;

  @AutoMap()
  public readonly canAssignDeal: boolean;

  @AutoMap()
  public readonly canCreateDeal: boolean;

  @AutoMap()
  public readonly canUpdateDeal: boolean;

  @AutoMap()
  public readonly canRemoveDeal: boolean;

  @AutoMap()
  public readonly canCreateProcess: boolean;

  @AutoMap()
  public readonly canUpdateProcess: boolean;

  @AutoMap()
  public readonly canRemoveProcess: boolean;

  @AutoMap()
  public readonly canAccessRole: boolean;

  @AutoMap()
  public readonly canAccessCustomer: boolean;

  @AutoMap()
  public readonly canAssignCustomer: boolean;

  @AutoMap()
  public readonly canGetAllCustomer: boolean;

  @AutoMap()
  public readonly canCreateCustomer: boolean;

  @AutoMap()
  public readonly canUpdateCustomer: boolean;

  @AutoMap()
  public readonly canRemoveCustomer: boolean;

  @AutoMap()
  public readonly canImportCustomer: boolean;

  @AutoMap()
  public readonly canAssignActivity: boolean;

  @AutoMap()
  public readonly canGetAllActivity: boolean;

  @AutoMap()
  public readonly canAccessTicket: boolean;

  @AutoMap()
  public readonly canGetTicketDeal: boolean;

  @AutoMap()
  public readonly canGetTicketSupport: boolean;

  @AutoMap()
  public readonly canUpdateTicket: boolean;

  @AutoMap()
  public readonly canRemoveTicket: boolean;

  @AutoMap()
  public readonly canAccessProduct: boolean;

  @AutoMap()
  public readonly canCreateProduct: boolean;

  @AutoMap()
  public readonly canUpdateProduct: boolean;

  @AutoMap()
  public readonly canRemoveProduct: boolean;

  @AutoMap()
  public readonly canImportEmployee: boolean;

  @AutoMap()
  public readonly canImportProduct: boolean;

  @AutoMap()
  public readonly canAccessEvent: boolean;

  @AutoMap()
  public readonly canCreateEvent: boolean;

  @AutoMap()
  public readonly canUpdateEvent: boolean;

  @AutoMap()
  public readonly canRemoveEvent: boolean;

  @AutoMap()
  public readonly description: string;

  public readonly accounts: AccountVM[];

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

export class RoleCM {

  @ApiProperty()
  public readonly id: string;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly level: number;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetAllDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetFeedbackDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetAssignDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAssignDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAssignCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetAllCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAssignActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetAllActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetTicketDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetTicketSupport: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessProduct: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateProduct: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateProduct: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveProduct: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportProduct: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveEvent: boolean;

  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  public readonly accounts: AccountVM[];
}

export class RoleUM {

  @ApiProperty()
  public readonly id: string;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly level: number;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetAllDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetAssignDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetFeedbackDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAssignDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAssignCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetAllCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAssignActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetAllActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetTicketDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetTicketSupport: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessProduct: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateProduct: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateProduct: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveProduct: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportProduct: boolean

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveEvent: boolean;
  
  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  public readonly accounts: AccountVM[];
}