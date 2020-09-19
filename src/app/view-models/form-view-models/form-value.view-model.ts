export class FormValueVM {
  public readonly id: string;
  public readonly formControlId: string;
  public readonly formDataId: string;
  public readonly value: string;
  public readonly isDelete: boolean;
  public readonly createdBy: string;
  public readonly updatedBy: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export class FormValueCM {
  public readonly formControlId: string;
  public readonly formDataId: string;
  public readonly value: string;
}

export class FormValueUM {
  public readonly id: string;
  public readonly formControlId: string;
  public readonly formDataId: string;
  public readonly value: string;
}