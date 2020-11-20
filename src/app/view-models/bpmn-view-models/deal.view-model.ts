import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from 'nestjsx-automapper';
import { AccountVM } from "../account-view-models";
import { CustomerVM } from "../customer-view-models";
import { ActivityVM } from "./activity.view-model";
import { DealDetailVM } from "./deal-detail.view-model";
import { StageVM } from "./stage.view-model";

export class DealVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly title: string;

  public readonly customer: CustomerVM;

  public readonly stage: StageVM;

  @AutoMap()
  public readonly description: string;

  @AutoMap()
  public readonly status: string;

  @AutoMap()
  public readonly currentStep: number;

  @AutoMap()
  public readonly feedbackMessage: string;

  @AutoMap()
  public readonly feedbackRating: number;

  @AutoMap()
  public readonly feedbackStatus: boolean;

  public readonly feedbackAssignee: AccountVM;

  public readonly activitys: ActivityVM;

  public readonly dealDetails: DealDetailVM[];

  public totalPrice: number;

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

export class DealCM {

  @ApiProperty()
  public readonly customer: {id : string};
  
  @ApiProperty()
  public readonly stage: {id : string};

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly description: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly title: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly status: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'number' })
  public readonly currentStep: number;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string' })
  public readonly feedbackMessage: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'number' })
  public readonly feedbackRating: number;

  @AutoMap()
  @ApiProperty({ required: true, format: 'boolean' })
  public readonly feedbackStatus: boolean;

  @ApiProperty()
  public readonly feedbackAssignee: {id : string};

  @ApiProperty()
  public readonly activitys: { id: string }[];
  
  public readonly dealDetails: DealDetailVM[];
}

export class DealUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty()
  public readonly customer: {id : string};
  
  @ApiProperty()
  public readonly stage: {id : string};

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly description: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly title: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly status: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'number' })
  public readonly currentStep: number;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string' })
  public readonly feedbackMessage: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'number' })
  public readonly feedbackRating: number;

  @AutoMap()
  @ApiProperty({ required: true, format: 'boolean' })
  public readonly feedbackStatus: boolean;

  @ApiProperty()
  public readonly feedbackAssignee: {id : string};

  @ApiProperty()
  public readonly activitys: {id : string}[];
}

export class DealFilter {
  public readonly customerId?: string;

  public readonly processId?: string;
}