import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";

export class RoleVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly name: string;

  @AutoMap()
  public readonly description: string;
}

export class RoleCM {

  @AutoMap()
  @ApiProperty()
  public readonly id: string;

  @AutoMap()
  @ApiProperty()
  public readonly name: string;

  @AutoMap()
  @ApiProperty()
  public readonly description: string;
}

export class RoleUM {

  @AutoMap()
  @ApiProperty()
  public readonly id: string;

  @AutoMap()
  @ApiProperty()
  public readonly name: string;

  @AutoMap()
  @ApiProperty()
  public readonly description: string;
}