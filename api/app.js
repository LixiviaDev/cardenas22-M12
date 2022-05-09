const http = require('http');
require('dotenv').config();
const config = require('./config.js');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});


server.listen(config.PORT, () => {
  console.log(`Server running at http://${config.HOST}:${config.PORT}/`);
});