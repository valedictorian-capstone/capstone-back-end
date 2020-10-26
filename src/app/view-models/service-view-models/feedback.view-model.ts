import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { CustomerVM } from "../customer-view-models";
import { OrderVM } from "./order.view-model"


export class FeedBackVM {

    @AutoMap()
    public readonly id: string;

    @AutoMap()
    public readonly value: string;

    public readonly customer: CustomerVM;

    public readonly order: OrderVM;

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

export class FeedBackCM {

    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly value: string;

    @ApiProperty()
    public readonly customer: {
        customer: { id: string }
    };

    @ApiProperty()
    public readonly order: {
        order: { id: string }
    };

}

export class FeedBackUM {

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly id: string;

    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly value: string;

    @ApiProperty()
    public readonly customer: {
        customer: { id: string }
    };

    @ApiProperty()
    public readonly order: {
        order: { id: string }
    };

}