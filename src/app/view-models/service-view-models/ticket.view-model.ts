import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { AccountVM } from "../account-view-models";
import { CustomerVM } from "../customer-view-models";


export class TicketVM {

    @AutoMap()
    public readonly id: string;

    @AutoMap()
    public readonly feedback: string;

    public readonly customer: CustomerVM;

    public readonly assignee: AccountVM;

    @AutoMap()
    public readonly feedbackMessage: string;

    @AutoMap()
    public readonly feedbackRating: number;

    @AutoMap()
    public readonly feedbackStatus: boolean;

    public readonly feedbackAssignee: AccountVM;

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

    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly feedback: string;

    @ApiProperty({ required: true, format: 'string' })
    public readonly customer: { id: string };

    @ApiProperty({ required: true })
    public readonly assignee: { id: string };

    @ApiProperty({ required: true })
    public readonly feedbackAssignee: { id: string };


}