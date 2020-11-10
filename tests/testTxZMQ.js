const zmq = require("zeromq");

async function run() {
  const sock = new zmq.Push

  await sock.bind("tcp://127.0.0.1:5050")
  console.log("Producer on !");

 while (true) {
   console.log("sending msg");
  await sock.send(["kitty cats","meow !"]);
  await new Promise(resolve => setTimeout(resolve, 500));
 }
}

run();
