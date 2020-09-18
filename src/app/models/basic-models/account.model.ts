import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { hashSync } from 'bcrypt';
import { Role } from './role.model';
@Entity()
export class Account extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ nullable: false })
    public fullname!: string;

    @Column({nullable: false, unique: true})
    public email!: string;

    @Column({nullable: false, unique: true})
    public phone!: string;

    @Column({nullable: false})
    public password!: string;

    @ManyToMany(() => Role, Role => Role.accounts)
    public roles: Role[];

    @Column()
    public createdBy: string;

    @Column()
    public updatedBy: string;

    @Column({default: false})
    public isDelete: boolean;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
      this.password = await hashSync(this.password, 10);
    }
}
