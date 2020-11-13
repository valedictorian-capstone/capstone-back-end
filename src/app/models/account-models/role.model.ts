import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.model";

@Entity()
export class Role extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ nullable: false, default: '' })
  public name: string;

  @AutoMap()
  @Column({ default: true })
  public readonly canManageEmployee: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canCreateEmployee: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateEmployee: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveEmployee: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canImportEmployee: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canExportEmployee: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canManageLead: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canCreateLead: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateLead: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveLead: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canImportLead: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canExportLead: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canManageDeal: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canCreateDeal: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateDeal: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveDeal: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canImportDeal: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canExportDeal: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canManageProcess: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canCreateProcess: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateProcess: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveProcess: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canImportProcess: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canExportProcess: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canManageRole: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canCreateRole: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateRole: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveRole: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canImportRole: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canExportRole: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canManageCustomer: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canCreateCustomer: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateCustomer: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveCustomer: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canImportCustomer: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canExportCustomer: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canManageActivity: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canCreateActivity: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateActivity: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveActivity: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canImportActivity: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canExportActivity: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canManageTicket: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canCreateTicket: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateTicket: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveTicket: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canImportTicket: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canExportTicket: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canManageService: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canCreateService: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateService: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveService: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canImportService: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canExportService: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canManageEvent: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canCreateEvent: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateEvent: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveEvent: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canImportEvent: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canExportEvent: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canManageFeedback: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canCreateFeedback: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateFeedback: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveFeedback: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canImportFeedback: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canExportFeedback: boolean;

  @AutoMap()
  @Column({ nullable: false, default: '' })
  public description: string;

  @ManyToMany(() => Account, account => account.roles)
  public accounts: Account[];

  @AutoMap()
  @Column({ default: 'admin' })
  public createdBy: string;

  @AutoMap()
  @Column({ default: null })
  public updatedBy: string;

  @AutoMap()
  @Column({ default: false })
  public isDelete: boolean;

  @AutoMap()
  @CreateDateColumn()
  public createdAt: Date;

  @AutoMap()
  @CreateDateColumn()
  public updatedAt: Date;
}