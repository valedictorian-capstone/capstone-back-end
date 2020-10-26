import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { CustomerVM } from "../customer-view-models";
import { FeedBackVM } from "./feedback.view-model";


export class OrderVM {
  
  @AutoMap()
  public readonly id: string;
  
  public readonly customer: CustomerVM;

  public readonly feedBacks: FeedBackVM[];
  
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

export class OrderCM {

    @ApiProperty()
    public readonly customer: {
        customer: { id: string }
    };

    @ApiProperty()
    public readonly feedBacks: {
        feedBack: { id: string }
    }[];

}

export class OrderUM {

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly id: string;

    @ApiProperty()
    public readonly customer: {
        customer: { id: string }
    };

    @ApiProperty()
    public readonly feedBacks: {
        feedBack: { id: string }
    }[];

}
