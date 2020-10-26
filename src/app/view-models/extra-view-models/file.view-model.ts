import { ApiProperty } from "@nestjs/swagger";

export class FileCM {
  @ApiProperty()
  public readonly file: string;
  @ApiProperty()
  public readonly fileName: string;
  @ApiProperty()
  public readonly fileType: string;
  @ApiProperty()
  public readonly folder: string;
}