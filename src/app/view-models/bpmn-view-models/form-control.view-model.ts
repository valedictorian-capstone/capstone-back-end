import { FormControlPatternVM } from "./form-control-pattern.view-model";
import { FormValueVM } from "./form-value.view-model";

export class FormControlVM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly PlaceHolder!: string;
  public readonly FontSize!: string;
  public readonly Size!: string;
  public readonly Options!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly Width!: string;
  public readonly Height!: string;
  public readonly IsCapitialize!: string;
  public readonly Tooltip!: string;
  public readonly Color!: string;
  public readonly FormControlPatternVMs!: FormControlPatternVM[];
  public readonly FormValueVMs!: FormValueVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class FormControlCM {
  public readonly Name!: string;
  public readonly PlaceHolder!: string;
  public readonly FontSize!: string;
  public readonly Size!: string;
  public readonly Options!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly Width!: string;
  public readonly Height!: string;
  public readonly IsCapitialize!: string;
  public readonly Tooltip!: string;
  public readonly Color!: string;
}

export class FormControlUM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly PlaceHolder!: string;
  public readonly FontSize!: string;
  public readonly Size!: string;
  public readonly Options!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly Width!: string;
  public readonly Height!: string;
  public readonly IsCapitialize!: string;
  public readonly Tooltip!: string;
  public readonly Color!: string;
}