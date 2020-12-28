import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.model";

@Entity()
export class Role extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ nullable: false, default: '' })
  public name: string;

  @AutoMap()
  @Column({ default: 0 })
  public level: number;

  @AutoMap()
  @Column({ default: true })
  public readonly canAccessDeal: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canGetAllDeal: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canGetFeedbackDeal: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canGetAssignDeal: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canAssignDeal: boolean;

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
  public readonly canCreateProcess: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateProcess: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveProcess: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canAccessRole: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canAccessCustomer: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canAssignTicket: boolean;

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
  public readonly canImportEmployee: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canAssignActivity: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canGetAllActivity: boolean;
  

  @AutoMap()
  @Column({ default: true })
  public readonly canAccessTicket: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canGetFeedbackTicket: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canGetTicketDeal: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canGetTicketSupport: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateTicket: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveTicket: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canAccessProduct: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canCreateProduct: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canUpdateProduct: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canRemoveProduct: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canImportProduct: boolean;

  @AutoMap()
  @Column({ default: true })
  public readonly canAccessEvent: boolean;

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
  @Column({ nullable: false, default: '' })
  public description: string;

  @ManyToMany(() => Employee, employee => employee.roles)
  public employees: Employee[];

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