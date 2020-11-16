import { Ticket } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { TICKET_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class TicketRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(TICKET_REPOSITORY, TicketRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Ticket);
  }
}
