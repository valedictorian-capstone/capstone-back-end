import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.model";

@Entity()
export class Group extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ nullable: false })
    public name!: string;

    @Column()
    public description!: string;
    
    @ManyToMany(() => Customer)
    @JoinTable()
    public customer: Customer[];

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