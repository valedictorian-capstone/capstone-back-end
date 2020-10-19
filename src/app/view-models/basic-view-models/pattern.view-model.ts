import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { FormControlVM } from "../form-view-models";
import { ExtraInformationVM } from "./extra-information.view-model";

export class PatternVM {

    @AutoMap()
    public readonly id: string;

    @AutoMap()
    public readonly name: string;

    @AutoMap()
    public readonly description: string;

    @AutoMap()
    public readonly value: string;

    @AutoMap()
    public readonly enum: any[];

    @AutoMap()
    public readonly len: number;

    @AutoMap()
    public readonly max: number;

    @AutoMap()
    public readonly message: string;

    @AutoMap()
    public readonly min: number;

    @AutoMap()
    public readonly pattern: string;

    @AutoMap()
    public readonly required: boolean;

    @AutoMap()
    public readonly type: string;

    @AutoMap()
    public readonly whitespace: boolean;

    @AutoMap()
    public readonly validateTrigger: string;

    @AutoMap()
    public readonly isUnique: boolean

    public readonly extraInformations: ExtraInformationVM[];

    public readonly formControls: FormControlVM[];

}

export class PatternCM {

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly name: string;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly description: string;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly value: string;

    @ApiProperty({ required: true, format: 'array'})
    public readonly enum: any[];

    @ApiProperty({ required: true, format: 'number' })
    public readonly len: number;

    @ApiProperty({ required: true, format: 'number' })
    public readonly max: number;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly message: string;

    @ApiProperty({ required: true, format: 'number' })
    public readonly min: number;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly pattern: string;

    @ApiProperty({ required: true, format: 'boolean' })
    public readonly required: boolean;

    @ApiProperty({ required: true, format: 'boolean' })
    public readonly isUnique: boolean;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly type: string;

    @ApiProperty({ required: true, format: 'boolean' })
    public readonly whitespace: boolean;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly validateTrigger: string;
    
    @ApiProperty()
    public readonly extraInformations: { id: string }[];

    @ApiProperty()
    public readonly formControls: { id: string }[];
}

export class PatternUM {

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly id: string;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly description: string;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly value: string;

    @ApiProperty({ required: true, format: 'array'})
    public readonly enum: any[];

    @ApiProperty({ required: true, format: 'number' })
    public readonly len: number;

    @ApiProperty({ required: true, format: 'number' })
    public readonly max: number;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly message: string;

    @ApiProperty({ required: true, format: 'number' })
    public readonly min: number;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly pattern: string;

    @ApiProperty({ required: true, format: 'boolean' })
    public readonly required: boolean;

    @ApiProperty({ required: true, format: 'boolean' })
    public readonly isUnique: boolean;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly type: string;

    @ApiProperty({ required: true, format: 'boolean' })
    public readonly whitespace: boolean;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly validateTrigger: string;
    
    @ApiProperty()
    public readonly extraInformations: { id: string }[];

    @ApiProperty()
    public readonly formControls: { id: string }[];
}