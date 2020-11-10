// Basic webserver 
// It handles the webpage display on port 3000
// Warning : this webserver is not secure, baic protection are not implemented, for LAN use only

let express = require('express');
let http = require('http');
let path = require('path');

let app = express();

app.use('/static',express.static('node_modules'));
app.use('/js', express.static('js'));

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/template.html'));
})

let server = http.createServer(app);
server.listen('3000', () => {
  console.log('Listenning on port 3000');
})
