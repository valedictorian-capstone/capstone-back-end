import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from './group.model';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public fullname!: string;

  @Column({ nullable: false, unique: true })
  public email!: string;

  @Column({ nullable: false, unique: true })
  public phone!: string;

  @ManyToMany(() => Group)
  @JoinTable()
  public customerGroup: Group[];

  @Column()
  public createdBy: string;

  @Column()
  public updatedBy: string;

  @Column({ default: false })
  public isDelete: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
