import { inject } from "@extras/functions";
import { Inject } from "@nestjs/common";
import { ATTACHMENT_REPOSITORY } from "@types";
import { Attachment } from "@models";
import { Connection } from "typeorm";

export class AttachmentRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(ATTACHMENT_REPOSITORY, AttachmentRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Attachment);
  }
}
