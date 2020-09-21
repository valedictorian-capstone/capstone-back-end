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
import { WFStepInstance } from './wf-step-instance.model';
<<<<<<< HEAD:src/app/models/bpmn-models/wf-instance.ts
import { WF } from './wf.model';
=======
import { Customer } from '../customer-models/customer.model';
>>>>>>> ee8f3789debbfef3e297eb16a1a9c67545e21369:src/app/models/bpmn-models/wf-instance.model.ts

@Entity()
export class WFInstance extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public Code: string;

  @AutoMap()
  @Column({ default: null })
  public note: string;

<<<<<<< HEAD:src/app/models/bpmn-models/wf-instance.ts
  // @AutoMap(() => WFStepInstance, 1)
  @OneToMany(
    () => WFStepInstance,
    wFStepInstances => wFStepInstances.wFInstance,
  )
  public wFStepInstances: WFStepInstance[];

  @AutoMap(() => WF, 1)
  public wf: WF;
=======
  @AutoMap()
  @OneToMany(() => WFStepInstance, wFStepInstances => wFStepInstances.wFInstance,
  )
  public wFStepInstances: WFStepInstance[];

  @AutoMap(() => Customer)
  @ManyToOne(() => Customer, customer => customer.wFInstances)
  public customer: Customer;
>>>>>>> ee8f3789debbfef3e297eb16a1a9c67545e21369:src/app/models/bpmn-models/wf-instance.model.ts

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
