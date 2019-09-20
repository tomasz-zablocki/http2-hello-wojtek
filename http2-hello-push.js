const http2   = require('http2');
const options = require('./options');

const server = http2.createSecureServer(options);
server.on('stream', (stream, headers) => {
    console.log('przyszet request');
    console.log(JSON.stringify(stream, null, 2));
    // stream is a Duplex
    // headers is an object containing the request headers

    // there is also stream.respondWithFile()
    // respond will send the headers to the client
    stream.respond({ ':status': 200 });
    console.log('mowie strumieniu 200');

    stream.pushStream({ ':path': '/xxx.jpg' }, (err, pushStream, headers) => {
        console.log('otwarlżem push stream');
        if (err) throw err;
        pushStream.respond({ ':status': 200 });
        console.log('mowie push 200');
        pushStream.end('some pushed data');
        console.log('zamykam pusz');

        console.log('bede stronom odpowiadal');

        const page = `<html>
<body>
<div>
<img src="/xxx.jpg"/>
</div>
</body>
</html>`;

        stream.end(page);
        console.log('odpowiedziane a stream zamknion');
    });
});

server.listen(3000);
