const http2   = require('http2');
 const options = require('./options');
 const opts = {ca: options.cert}

const client = http2.connect('https://localhost:3000', opts);
client.on('stream', (stream, headers) => {

    stream.on('error', err => {console.log('!!!!!!!'); console.error(err)})

    stream.on('headers', (headers, flags) => {
        console.log(headers);
    });
    stream.on('push', (headers, flags) => {
        console.log('push');
        console.log(headers);
    });

});


