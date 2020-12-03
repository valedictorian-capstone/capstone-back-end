import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { CustomerVM } from "../customer-view-models";
import { ProductVM } from "../product-view-models";

export class CommentVM {

    @AutoMap()
    public readonly id: string;

    @AutoMap()
    public readonly message: string;

    @AutoMap()
    public readonly rating: number;

    public customer: CustomerVM;

    public product: ProductVM;

    @AutoMap()
    public readonly createdBy: string;

    @AutoMap()
    public readonly updatedBy: string;

    @AutoMap()
    public readonly createdAt: Date;

    @AutoMap()
    public readonly updatedAt: Date;
}

export class CommentCM {

    @ApiProperty()
    public readonly message: string;

    @ApiProperty()
    public readonly rating: number;

    @ApiProperty()
    public readonly customer: {id: string};

    @ApiProperty()
    public readonly product: {id: string};

}

export class CommentUM {

    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly message: string;

    @ApiProperty()
    public readonly rating: number;

    @ApiProperty()
    public readonly customer: {id: string};

    @ApiProperty()
    public readonly product: {id: string};

}