// import { Model, PrimaryKey, Column, HasMany, Default, CreatedAt, UpdatedAt, Table, IsUUID, Unique } from 'sequelize-typescript';
// import { uuid } from 'uuidv4';
// import { CustomerGroup } from './customer-group';
// @Table
// export class Group extends Model<Group> {

//     @IsUUID(4)
//     @Default(uuid)
//     @PrimaryKey
//     @Column
//     public Id!: string;

//     @Unique
//     @Column
//     public Name!: string;

//     @Column
//     public Description!: string;
    
//     @HasMany(() => CustomerGroup)
//     public CustomerGroup!: CustomerGroup[];

//     @Column
//     public CreatedBy: string;

//     @Column
//     public UpdatedBy: string;

//     @Default(false)
//     @Column
//     public IsDelete: boolean;

//     @CreatedAt
//     public CreatedAt: Date;

//     @UpdatedAt
//     public UpdatedAt: Date;
// }