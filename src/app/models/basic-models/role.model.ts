import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.model";
@Entity()
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    public Id: string;

    @Column({ nullable: false })
    public Name: string;

    @Column({ length: 500 })
    public Description: string;

    @ManyToMany(() => Account, Account => Account.Roles)
    public Accounts: Account[];

    @Column()
    public CreatedBy: string;

    @Column()
    public UpdatedBy: string;

    @Column({default: false})
    public IsDelete: boolean;

    @CreateDateColumn()
    public CreatedAt: Date;

    @UpdateDateColumn()
    public UpdatedAt: Date;
}