import { Publisher, Subjects, TicketCreatedEvent } from "sgticketsbekeeeee";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
