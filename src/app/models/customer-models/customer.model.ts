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
import { CustomerExtraInformationData } from './customer-extra-information-data.model';

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

  @ManyToMany(() => Group, group => group.customers)
  @JoinTable()
  public groups: Group[];

  @OneToMany(() => WFInstance, wFInstances=> wFInstances.customer )
  public wFInstances: WFInstance[];

  @OneToMany(() => CustomerExtraInformationData, customerExtraInformationDatas => customerExtraInformationDatas.customer)
  public customerExtraInformationDatas: CustomerExtraInformationData[];

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
