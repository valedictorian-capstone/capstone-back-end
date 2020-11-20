import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { ProductVM } from "./product.view-model";

export class CategoryVM {

    @AutoMap()
    public readonly id: string;
  
    @AutoMap()
    public readonly name: string;

    public readonly products: ProductVM[];

}

export class CategoryCM {

    @AutoMap()
    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public name: string;

}

export class CategoryUM {

    @AutoMap()
    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public id: string;

    @AutoMap()
    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public name: string;
    
}