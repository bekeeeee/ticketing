import { Publisher, Subjects, OrderCancelledEvent } from "sgticketsbekeeeee";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
