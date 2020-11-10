var zmq = require("zeromq");

async function run() {
  const sock = new zmq.Pull;
  
  sock.connect("tcp://127.0.0.1:5050");
  console.log("Worker connected to port 5050");
 
  for await(const [msg] of sock) {
    var sorted = msg.sort();
    console.log(sorted.toString());
  }
}

run();
