// A very simple webserver, serving things statically out of the
// local directory, with socket.io support.
//
// Some basic configurability via two environment variables:
//
// - SERVER_MODE can be "http" or "http2", and picks the
//   corresponding HTTP implementation. Defaults to "http",
//   i.e. HTTP/1.1.
//
// - SERVER_PORT is the listening port, defaulting to 80.
//
var mode = process.env.SERVER_MODE || 'http';
var port = Number(process.env.SERVER_PORT || '80');

var stat = require('node-static');
var http = require('http')
var http2 = require('http2')
var socketio = require('socket.io');

var file = new(stat.Server)();
var impl;
var settings = {};

if (mode == 'http') {
    impl = http;
} else if (mode == 'http2') {
    impl = http2;
    settings = { enableConnectProtocol: true };
} else {
    throw new Error('Invalid HTTP mode ' + mode);
}
    
var server = impl.createServer({ settings: settings }, (req, res) => {
    file.serve(req, res, function (err, result) {
        if (err) {
            console.error("error serving " + req.url + " - " + err.message);
            // Respond to the client
            res.writeHead(err.status, err.headers);
            res.end();
        } else {
            console.log("serving " + req.url);
        }
    });
});

// Below is just the socket.io chat example from
// https://socket.io/get-started/chat/.
// To disable polling completely you can use the following:
// var io = socketio(server, { transports: ['websocket']});
var io = socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
});

server.listen(port, () => {
    console.log('speaking %s on *:%d', mode, port);
});
