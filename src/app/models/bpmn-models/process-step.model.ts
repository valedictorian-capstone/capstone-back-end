import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { FormGroup } from '../form-models';
import { ProcessConnection } from './process-connection.model';
import { Process } from './process.model';

@Entity()
export class ProcessStep extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public name: string;

  @AutoMap()
  @Column({ default: null })
  public type: string;
  @AutoMap()
  @Column({ default: null })
  public subType: string;
  @AutoMap()
  @Column({ default: null })
  public description: string;

  @ManyToOne(() => Process, process => process.processSteps)
  public process: Process;

  @OneToMany(() => ProcessConnection, processConnection => processConnection.fromProcessStep)
  public processFromConnections: ProcessConnection[];

  @OneToMany(() => ProcessConnection, processConnection => processConnection.toProcessStep)
  public processToConnections: ProcessConnection[];

  @ManyToMany(() => FormGroup, formGroup => formGroup.processSteps)
  public formGroups: FormGroup[];

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
