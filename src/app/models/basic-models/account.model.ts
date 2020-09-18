import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { hashSync } from 'bcrypt';
import { Role } from './role.model';
import { AutoMap } from 'nestjsx-automapper';
@Entity()
export class Account extends BaseEntity {

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public Id: string;

  @AutoMap()
  @Column({ nullable: false })
  public Fullname!: string;

  @AutoMap()
  @Column({ nullable: false, unique: true })
  public Email!: string;

  @AutoMap()
  @Column({ nullable: false, unique: true })
  public Phone!: string;

  @AutoMap()
  @Column({ nullable: false })
  public Password!: string;

  @AutoMap(() => Role)
  @ManyToMany(() => Role, Role => Role.accounts)
  public Roles: Role[];

  @AutoMap()
  @Column({ default: 'admin' })
  public CreatedBy: string;

  @AutoMap()
  @Column({ default: null })
  public UpdatedBy: string;

  @AutoMap()
  @Column({ default: false })
  public IsDelete: boolean;

  @AutoMap()
  @CreateDateColumn()
  public CreatedAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  public UpdatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.Password = await hashSync(this.Password, 10);
  }
}
