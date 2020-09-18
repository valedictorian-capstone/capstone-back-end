import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.model";
@Entity()
export class Role extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public Id: string;

    @AutoMap()
    @Column({ nullable: false })
    public Name: string;

    @AutoMap()
    @Column({ length: 500 })
    public Description: string;

    @AutoMap()
    @ManyToMany(() => Account, Account => Account.Roles)
    public Accounts: Account[];

    @AutoMap()
    @Column({ default: 'crm'})
    public CreatedBy: string;

    @AutoMap()
    @Column({ default: 'crm'})
    public UpdatedBy: string;

    @AutoMap()
    @Column({default: false})
    public IsDelete: boolean;

    @AutoMap()
    @CreateDateColumn()
    public CreatedAt: Date;

    @AutoMap()
    @UpdateDateColumn()
    public UpdatedAt: Date;
}