import { Publisher, Subjects, OrderCreatedEvent } from "sgticketsbekeeeee";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
