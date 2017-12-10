let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

let chatIO = require('./controllers/chatIO');

chatIO(io);

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

server.listen(process.env.PORT || 3000);
console.log('Server running...');



