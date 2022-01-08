import nats from "node-nats-streaming";
console.clear();

async function sleep(duration: number): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
}
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  let i = 0;
  console.log("Publisher connected to NATS");
  const data = JSON.stringify({
    id: "123",
    title: "connect",
    price: 20,
  });
  while (i < 10) {
    stan.publish("ticket:created", data, () => {
      console.log("Event published");
    });
    await sleep(1000);
    i = i + 1;
  }
});
