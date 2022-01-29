import { Message } from "node-nats-streaming";
import { Listener, OrderCancelledEvent, Subjects } from "sgticketsbekeeeee";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-created-listener";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // if no ticket, throw new error
    if (!ticket) throw new Error("Ticket not found");

    // null orderId
    ticket.set({ orderId: undefined });

    // save ticket
    await ticket.save();
    // publish ticketUpdated

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    // ack the message
    msg.ack();
  }
}
