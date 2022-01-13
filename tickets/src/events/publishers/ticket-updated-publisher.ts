import { Publisher, Subjects, TicketUpdatedEvent } from "sgticketsbekeeeee";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
