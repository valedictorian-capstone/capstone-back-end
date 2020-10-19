import { AutoMap } from 'nestjsx-automapper';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Account } from '../account-models';
import { WFStepInstance } from '../bpmn-models';

@Entity()
export class Comment extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false, default: '' })
    public value: string;

    @ManyToOne(() => Account, account => account.comments)
    public account: Account;

    @ManyToOne(() => WFStepInstance, wfStepInstance => wfStepInstance.comments)
    public wfStepInstance: WFStepInstance;

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