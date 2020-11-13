import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";

export class RoleVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly name: string;

  @AutoMap()
  public readonly canManageEmployee: boolean;

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
  public readonly canManageLead: boolean;

  @AutoMap()
  public readonly canCreateLead: boolean;

  @AutoMap()
  public readonly canUpdateLead: boolean;

  @AutoMap()
  public readonly canRemoveLead: boolean;

  @AutoMap()
  public readonly canImportLead: boolean;

  @AutoMap()
  public readonly canExportLead: boolean;

  @AutoMap()
  public readonly canManageDeal: boolean;

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
  public readonly canManageProcess: boolean;

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
  public readonly canManageRole: boolean;

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
  public readonly canManageCustomer: boolean;

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
  public readonly canManageActivity: boolean;

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
  public readonly canManageTicket: boolean;

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
  public readonly canManageService: boolean;

  @AutoMap()
  public readonly canCreateService: boolean;

  @AutoMap()
  public readonly canUpdateService: boolean;

  @AutoMap()
  public readonly canRemoveService: boolean;

  @AutoMap()
  public readonly canImportService: boolean;

  @AutoMap()
  public readonly canExportService: boolean;

  @AutoMap()
  public readonly canManageEvent: boolean;

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
  public readonly canManageFeedback: boolean;

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
}

export class RoleCM {

  @AutoMap()
  @ApiProperty()
  public readonly id: string;

  @AutoMap()
  @ApiProperty()
  public readonly name: string;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canManageEmployee: boolean;

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
  public readonly canManageLead: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateLead: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateLead: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveLead: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportLead: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportLead: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canManageDeal: boolean;

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
  public readonly canManageProcess: boolean;

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
  public readonly canManageRole: boolean;

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
  public readonly canManageCustomer: boolean;

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
  public readonly canManageActivity: boolean;

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
  public readonly canManageTicket: boolean;

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
  public readonly canManageService: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateService: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateService: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveService: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportService: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportService: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canManageEvent: boolean;

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
  public readonly canManageFeedback: boolean;

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

  @AutoMap()
  @ApiProperty()
  public readonly id: string;

  @AutoMap()
  @ApiProperty()
  public readonly name: string;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canManageEmployee: boolean;

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
  public readonly canManageLead: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateLead: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateLead: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveLead: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportLead: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportLead: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canManageDeal: boolean;

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
  public readonly canManageProcess: boolean;

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
  public readonly canManageRole: boolean;

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
  public readonly canManageCustomer: boolean;

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
  public readonly canManageActivity: boolean;

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
  public readonly canManageTicket: boolean;

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
  public readonly canManageService: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canCreateService: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canUpdateService: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canRemoveService: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canImportService: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canExportService: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly canManageEvent: boolean;

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
  public readonly canManageFeedback: boolean;

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