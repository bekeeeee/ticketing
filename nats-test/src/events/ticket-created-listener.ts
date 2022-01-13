import { Message, Stan } from "node-nats-streaming";
import { Listener, Subjects, TicketCreatedEvent } from "sgticketsbekeeeee";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "payments-service";
  constructor(client: Stan) {
    super(client);
  }
  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data!!!", data);

    msg.ack();
  }
}
