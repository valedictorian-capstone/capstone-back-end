import { AutoMap } from 'nestjsx-automapper';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountDepartment } from '../account-models';

@Entity()
export class Department extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false, default: '' })
    public name: string;

    @AutoMap()
    @Column({ nullable: false, default: '' })
    public description: string;

    @OneToMany(() => Department, departmentChildrens => departmentChildrens.departmentParent)
    public departmentChildrens: Department[];

    @ManyToOne(() => Department, departmentParent => departmentParent.departmentChildrens)
    public departmentParent: Department;

    @OneToMany(() => AccountDepartment, accountDepartments => accountDepartments.department)
    public accountDepartments: AccountDepartment[];

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