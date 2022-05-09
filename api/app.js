const http = require('http');
require('dotenv').config();
const config = require('./config.js');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(config.PORT, config.HOST, () => {
  console.log(`Server running at https://${config.HOST}:${config.PORT}/`);
});