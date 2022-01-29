import { Ticket } from "../ticket";

it("implement optimistic concurrency control", async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });
  // Save the ticket to the datavase
  await ticket.save();
  // fetch the ticket twice
  const firstFetch = await Ticket.findById(ticket.id);
  const secondFetch = await Ticket.findById(ticket.id);

  // make two seperate changes to the ticket fetched
  firstFetch?.set({ price: 10 });
  secondFetch?.set({ price: 15 });

  // save the first fetched ticket

  await firstFetch!.save();
  // save the first fetched ticket and expect an error
  try {
    await secondFetch!.save();
  } catch (err) {
    return;
  }
  throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });
  await ticket.save();
  expect(ticket.version).toEqual(0)

  await ticket.save();
  expect(ticket.version).toEqual(1)

  await ticket.save();
  expect(ticket.version).toEqual(2)

});
