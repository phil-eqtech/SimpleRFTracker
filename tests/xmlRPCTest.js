var xmlrpc = require('xmlrpc');

var server = xmlrpc.createServer({host:'localhost',port:9092});

server.on('set_freq', function(err, params, callback) {
  console.log("FREQ ! ");
  console.log(params);
  console.log('-');
  callback(null, 'aResult');
});

server.on('set_ampl', function(err, params, callback) {
  console.log(params);
  callback(null, 'aResult');
});

console.log('xmlrpc server on ! ');
