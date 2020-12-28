import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { EmployeeVM } from "../employee-view-models";
import { CustomerVM } from "../customer-view-models";


export class TicketVM {

    @AutoMap()
    public readonly id: string;

    @AutoMap()
    public readonly status: string;

    @AutoMap()
    public readonly ability: number;

    @AutoMap()
    public readonly note: string;

    public readonly customer: CustomerVM;

    public readonly assignee: EmployeeVM;

    @AutoMap()
    public readonly type: string;

    @AutoMap()
    public readonly description: string;

    @AutoMap()
    public readonly feedbackMessage: string;

    @AutoMap()
    public readonly feedbackRating: number;

    @AutoMap()
    public readonly feedbackStatus: boolean;

    public readonly feedbackAssignee: EmployeeVM;

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

export class TicketCM {

    @ApiProperty()
    public readonly customer: { id: string };

    @ApiProperty()
    public readonly assignee: { id: string };

    @ApiProperty({ required: true, format: 'string' })
    public readonly status: string;

    @ApiProperty({ required: true, format: 'number' })
    public readonly ability: number;

    @ApiProperty({ required: true, format: 'string' })
    public readonly note: string;

    @AutoMap()
    @ApiProperty({ required: true, format: 'string' })
    public readonly type: string;
    
    @AutoMap()
    @ApiProperty({ required: true, format: 'string' })
    public readonly description: string;

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
    public readonly feedbackAssignee: { id: string };

}

export class TicketUM {

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly id: string;

    @AutoMap()
    @ApiProperty({ required: true, format: 'string' })
    public readonly type: string;

    @ApiProperty({ required: true, format: 'string' })
    public readonly status: string;
    
    @ApiProperty({ required: true, format: 'number' })
    public readonly ability: number;

    @ApiProperty({ required: true, format: 'string' })
    public readonly note: string;
    
    @AutoMap()
    @ApiProperty({ required: true, format: 'string' })
    public readonly description: string;


    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly feedback: string;

    @ApiProperty({ required: true, format: 'string' })
    public readonly customer: { id: string };

    @ApiProperty({ required: true })
    public readonly assignee: { id: string };

    @ApiProperty({ required: true })
    public readonly feedbackAssignee: { id: string };


}