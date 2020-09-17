export class CommentVM {
  public readonly Id!: string;
  public readonly AccountId!: string;
  public readonly WorkFlowStepInstanceId!: string;
  public readonly Value!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class CommentCM {
  public readonly AccountId!: string;
  public readonly WorkFlowStepInstanceId!: string;
  public readonly Value!: string;
}

export class CommentUM {
  public readonly Id!: string;
  public readonly AccountId!: string;
  public readonly WorkFlowStepInstanceId!: string;
  public readonly Value!: string;
}