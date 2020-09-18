import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { hashSync } from 'bcrypt';
import { Role } from './role.model';
@Entity()
export class Account extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    public Id: string;

    @Column({ nullable: false })
    public Fullname!: string;

    @Column({nullable: false, unique: true})
    public Email!: string;

    @Column({nullable: false, unique: true})
    public Phone!: string;

    @Column({nullable: false})
    public Password!: string;

    @ManyToMany(() => Role, Role => Role.Accounts)
    public Roles: Role[];

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

    @BeforeInsert()
    async hashPassword() {
      this.Password = await hashSync(this.Password, 10);
    }
}
