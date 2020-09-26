import { ApiProperty } from "@nestjs/swagger";

export class AuthVM {
  @ApiProperty()
  public readonly username: string;
  @ApiProperty()
  public readonly password: string;
}