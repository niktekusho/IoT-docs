const app = require('./app');
const debug = require('debug')('server:server');
const http = require('http');

const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
