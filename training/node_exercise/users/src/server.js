const app = require('./app');
const debug = require('debug')('server:server');
const http = require('http');

const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    return debug('something bad happened', err);
  }

  debug(`server is listening on ${port}`);
});
