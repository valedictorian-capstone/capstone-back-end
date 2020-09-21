import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from './group.model';
import { WFInstance } from '../bpmn-models/wf-instance.model';
import { CustomerExtraInformation } from './customer-extra-information.model';
import { CustomerExtraData } from './customer-extra-data.model';

@Entity()
export class Customer extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ nullable: false })
  public fullname!: string;

  @AutoMap()
  @Column({ nullable: false, unique: true })
  public email!: string;

  @AutoMap()
  @Column({ nullable: false, unique: true })
  public phone: string;

  @AutoMap(() => Group)
  @ManyToMany(() => Group, group => group.customers)
  @JoinTable()
  public customerGroups: Group[];

  @AutoMap(() =>WFInstance)
  @OneToMany(() => WFInstance, wFInstances=> wFInstances.customer )
  public wFInstances: WFInstance[];

  @AutoMap()
  @OneToMany(() => CustomerExtraInformation, customerExtraInformations => customerExtraInformations.customer)
  public customerExtraInformations: CustomerExtraInformation[];

  @AutoMap(() => CustomerExtraData)
  @OneToMany(() => CustomerExtraData, customerExtraDatas => customerExtraDatas.customer)
  public customerExtraDatas: CustomerExtraData[];

  @AutoMap()
  @Column({ default: null })
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
  @UpdateDateColumn()
  public updatedAt: Date;
}
