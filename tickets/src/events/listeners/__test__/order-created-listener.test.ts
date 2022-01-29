import { OrderCreatedEvent, OrderStatus } from "sgticketsbekeeeee";
import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";

const setup = async () => {
  // Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 99,
    userId: "asd",
  });
  await ticket.save();

  // Create the fake data event

  const data: OrderCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "asdf",
    expiresAt: "alskdflaskjfd",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // Create fake msg
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg, ticket };
};

it("Sets the userID of the ticket", async () => {
  const { listener, data, msg, ticket } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it("acks the message", async () => {
  const { listener, data, msg, ticket } = await setup();

  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});

it("Publishes a ticket updated event", async () => {
  const { listener, data, msg, ticket } = await setup();
  await listener.onMessage(data, msg);
});
