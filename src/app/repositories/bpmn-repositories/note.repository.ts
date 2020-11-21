import { inject } from "@extras/functions";
import { Inject } from "@nestjs/common";
import { NOTE_REPOSITORY } from "@types";
import { Note } from "@models";
import { Connection } from "typeorm";

export class NoteRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(NOTE_REPOSITORY, NoteRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Note);
  }
}
