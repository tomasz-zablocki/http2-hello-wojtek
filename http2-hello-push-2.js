const http2   = require('http2');
const options = require('./options');

const server = http2.createSecureServer(options);
server.on('stream', (stream, headers) => {

    const endStream = () => {
        console.log('stream pre-end');
        stream.end(`<html lang="en"><body><div><img src="/xxx.jpg" alt=""/><img src="/xxx2.jpg" alt=""/></div></body></html>`);
        console.log('stream post-end');
    };

    console.log('request incoming: ' + headers[':path']);
     // respond will send the headers to the client
    stream.respond({ ':status': 200 });
    console.log('stream respond 200');
    //
    stream.pushStream({ ':path': '/' }, (err, pushStream, headers) => {
        console.log('pushStream start');
        if (err) throw err;
        pushStream.respond({ ':status': 200 });
        console.log('pushStream respond ');
        pushStream.end('pushStream1 end');
        console.log('pushStream end');

        stream.pushStream({ ':path': '/' }, (err, pushStream2, headers) => {
            console.log('pushStream2 start');
            if (err) throw err;
            pushStream2.respond({ ':status': 200 });
            console.log('pushStream2 respond ');
            pushStream2.end('pushStream2 end');
            console.log('pushStream2 end');
        });

        endStream()
    });

});

server.listen(3000);
