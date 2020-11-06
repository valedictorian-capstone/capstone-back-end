import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Customer } from '../customer-models/customer.model';
import { WFStepInstance } from './wf-step-instance.model';
import { WF } from './wf.model';

@Entity()
export class WFInstance extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public code: string;

  @AutoMap()
  @Column({ default: null })
<<<<<<< Updated upstream:src/app/models/bpmn-models/wf-instance.model.ts
  public note: string;

  // @AutoMap(() => WFStepInstance, 1)
=======
  public description: string;
  // @AutoMap(() => ProcessStepInstance, 1)
>>>>>>> Stashed changes:src/app/models/bpmn-models/process-instance.model.ts
  @OneToMany(
    () => WFStepInstance,
    wFStepInstances => wFStepInstances.wFInstance,
  )
  public wFStepInstances: WFStepInstance[];

  @AutoMap(() => Customer, 1)
  @ManyToOne(() => Customer, customer => customer.wFInstances)
  public customer: Customer;

<<<<<<< Updated upstream:src/app/models/bpmn-models/wf-instance.model.ts
  @AutoMap(() => WF, 1)
  public wf: WF;
=======
  @AutoMap(() => Process, 1)
  @ManyToOne(() => Process, process => process.processInstances)
  public process: Process;
>>>>>>> Stashed changes:src/app/models/bpmn-models/process-instance.model.ts

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
