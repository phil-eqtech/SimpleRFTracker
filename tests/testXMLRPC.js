var xmlrpc = require("xmlrpc");

var server = xmlrpc.createServer({host:'localhost', port:9090});

server.on('NotFound', function(method, params) {
  console.log('Method ' + method + ' does not exist');
});

server.on('set_freq', function(err, params, callback) {
  console.log("Method call params for 'set_freq' : "+params);
  callback(null, 'aResult');
});

console.log("XML-RPC server listenning on port 9090");

setTimeout(function() {
  var client = xmlrpc.createClient({host:'localhost', port:9090});
  client.methodCall('set_freq',[268000000], function(error, value) {
    console.log("Method response fon 'anAction' : " + value);
  });
}, 5000);
