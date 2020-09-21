import { AutoMap } from "nestjsx-automapper";
import { FormValueVM } from "./form-value.view-model";
import { WFStepInstanceVM } from "../bpmn-view-models/work-flow-step-instance.view-model";
import { ApiProperty } from "@nestjs/swagger";

export class FormDataVM {
  
  @AutoMap()
  public readonly id: string;
  
  @AutoMap(() => WFStepInstanceVM)
  public readonly wFStepInstance: WFStepInstanceVM;
  
  @AutoMap()
  public readonly formGroupId: string;
  
<<<<<<< HEAD
  @AutoMap(() => FormValueVM, 1)
  public readonly formValueVMs: FormValueVM[];
=======
  @AutoMap(()=>FormValueVM)
  public readonly formValues: FormValueVM[];
>>>>>>> ee8f3789debbfef3e297eb16a1a9c67545e21369
  
  @AutoMap()
  public readonly isDelete: boolean;
  
  @AutoMap()
  public readonly createdBy: string;
  
  @AutoMap()
  public readonly updatedBy: string;
  
  @AutoMap()
  public readonly createdAt: Date;
  
  @AutoMap()
  public readonly updatedAt: Date;
}

export class FormDataCM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly wFStepInstanceId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly formGroupId: string;
}

export class FormDataUM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly wFStepInstanceId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly formGroupId: string;
}