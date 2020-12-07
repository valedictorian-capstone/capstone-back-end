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
  public readonly canAccessEmployee: boolean;

  @AutoMap()
  public readonly canCreateEmployee: boolean;

  @AutoMap()
  public readonly canUpdateEmployee: boolean;

  @AutoMap()
  public readonly canRemoveEmployee: boolean;

  @AutoMap()
  public readonly canImportEmployee: boolean;

  @AutoMap()
  public readonly canExportEmployee: boolean;

  @AutoMap()
  public readonly canAccessDeal: boolean;

  @AutoMap()
  public readonly canGetAllDeal: boolean;

  @AutoMap()
  public readonly canCreateDeal: boolean;

  @AutoMap()
  public readonly canUpdateDeal: boolean;

  @AutoMap()
  public readonly canRemoveDeal: boolean;

  @AutoMap()
  public readonly canImportDeal: boolean;

  @AutoMap()
  public readonly canExportDeal: boolean;

  @AutoMap()
  public readonly canAccessProcess: boolean;

  @AutoMap()
  public readonly canCreateProcess: boolean;

  @AutoMap()
  public readonly canUpdateProcess: boolean;

  @AutoMap()
  public readonly canRemoveProcess: boolean;

  @AutoMap()
  public readonly canImportProcess: boolean;

  @AutoMap()
  public readonly canExportProcess: boolean;

  @AutoMap()
  public readonly canAccessRole: boolean;

  @AutoMap()
  public readonly canCreateRole: boolean;

  @AutoMap()
  public readonly canUpdateRole: boolean;

  @AutoMap()
  public readonly canRemoveRole: boolean;

  @AutoMap()
  public readonly canImportRole: boolean;

  @AutoMap()
  public readonly canExportRole: boolean;

  @AutoMap()
  public readonly canAccessCustomer: boolean;

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
  public readonly canExportCustomer: boolean;

  @AutoMap()
  public readonly canAccessActivity: boolean;

  @AutoMap()
  public readonly canGetAllActivity: boolean;

  @AutoMap()
  public readonly canCreateActivity: boolean;

  @AutoMap()
  public readonly canUpdateActivity: boolean;

  @AutoMap()
  public readonly canRemoveActivity: boolean;

  @AutoMap()
  public readonly canImportActivity: boolean;

  @AutoMap()
  public readonly canExportActivity: boolean;

  @AutoMap()
  public readonly canAccessTicket: boolean;

  @AutoMap()
  public readonly canGetTicketDeal: boolean;

  @AutoMap()
  public readonly canGetTicketSupport: boolean;

  @AutoMap()
  public readonly canCreateTicket: boolean;

  @AutoMap()
  public readonly canUpdateTicket: boolean;

  @AutoMap()
  public readonly canRemoveTicket: boolean;

  @AutoMap()
  public readonly canImportTicket: boolean;

  @AutoMap()
  public readonly canExportTicket: boolean;

  @AutoMap()
  public readonly canAccessProduct: boolean;

  @AutoMap()
  public readonly canCreateProduct: boolean;

  @AutoMap()
  public readonly canUpdateProduct: boolean;

  @AutoMap()
  public readonly canRemoveProduct: boolean;

  @AutoMap()
  public readonly canImportProduct: boolean;

  @AutoMap()
  public readonly canExportProduct: boolean;

  @AutoMap()
  public readonly canAccessEvent: boolean;

  @AutoMap()
  public readonly canCreateEvent: boolean;

  @AutoMap()
  public readonly canUpdateEvent: boolean;

  @AutoMap()
  public readonly canRemoveEvent: boolean;

  @AutoMap()
  public readonly canImportEvent: boolean;

  @AutoMap()
  public readonly canExportEvent: boolean;

  @AutoMap()
  public readonly canAccessFeedback: boolean;

  @AutoMap()
  public readonly canCreateFeedback: boolean;

  @AutoMap()
  public readonly canUpdateFeedback: boolean;

  @AutoMap()
  public readonly canRemoveFeedback: boolean;

  @AutoMap()
  public readonly canImportFeedback: boolean;

  @AutoMap()
  public readonly canExportFeedback: boolean;

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
  public readonly canAccessEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetAllDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessCustomer: boolean;

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
  public readonly canExportCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessActivity: boolean;
  
  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetAllActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetTicketDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetTicketSupport: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportTicket: boolean;

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
  public readonly canExportProduct: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessFeedback: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateFeedback: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateFeedback: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveFeedback: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportFeedback: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportFeedback: boolean;

  @AutoMap()
  @ApiProperty()
  public readonly description: string;
}

export class RoleUM {

  @ApiProperty()
  public readonly id: string;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly level: number;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportEmployee: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetAllDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportProcess: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportRole: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessCustomer: boolean;

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
  public readonly canExportCustomer: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessActivity: boolean;
  
  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetAllActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportActivity: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetTicketDeal: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canGetTicketSupport: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportTicket: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportTicket: boolean;

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
  public readonly canExportProduct: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportEvent: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canAccessFeedback: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateFeedback: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateFeedback: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveFeedback: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportFeedback: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportFeedback: boolean;
  
  @AutoMap()
  @ApiProperty()
  public readonly description: string;
}