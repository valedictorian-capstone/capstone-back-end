import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer-models";
import { Product } from "../product-models";

@Entity()
export class Comment extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ default: '' })
    public message: string;

    @AutoMap()
    @Column({ default: 1 })
    public rating: number;

    @ManyToOne(() => Customer, customer => customer.comments)
    public customer: Customer;

    @ManyToOne(() => Product, product => product.comments)
    public product: Product;

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