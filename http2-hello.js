const http2   = require('http2');
const options = require('./options');

// https is necessary otherwise browsers will not
// be able to connect
const server = http2.createSecureServer(options, (req, res) => {
    res.end('Hello World!');
});
server.listen(3000);
