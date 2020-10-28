import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { CustomerVM } from "../customer-view-models";
import { ServiceVM } from "./service.view-model";


export class OrderRequestVM {

    @AutoMap()
    public readonly id: string;

    @AutoMap()
    public readonly feedback: string;

    public readonly customer: CustomerVM;

    public readonly service: ServiceVM;

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

export class OrderRequestCM {

    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly feedback: string;

    @ApiProperty()
    public readonly customer: {
        customer: { id: string }
    };

    @ApiProperty()
    public readonly service: {
        service: { id: string }
    };

}

export class OrderRequestUM {

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly id: string;

    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly feedback: string;

    @ApiProperty()
    public readonly customer: {
        customer: { id: string }
    };

    @ApiProperty()
    public readonly service: {
        service: { id: string }
    };


}