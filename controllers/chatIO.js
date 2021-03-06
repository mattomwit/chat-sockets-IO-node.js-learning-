module.exports = (io) =>{
    let users = [];
    let connections = [];

    io.sockets.on('connection', function(socket){
        //when we connect to the server we want to add the socket to the array that we created in line 7
        connections.push(socket);
        console.log('Connected: %s socket connected', connections.length);
    
        //disconnect
        socket.on('disconnect',function(data){
            users.splice(users.indexOf(socket.username), 1);
            //after deleting user we need to refresh users in chat on server and with clients
            updateUsernames();
        //this deletes socket from connections  array[] 
            connections.splice(connections.indexOf(socket),1);
            console.log('Connected: %s socket connected', connections.length); 
        });
    
        //send message
        socket.on('send message', function(data){
            console.log(data);
            io.sockets.emit('new message', {msg: data, user: socket.username});
        });
    
        //new user
        socket.on('new user', function(data, callback){
            callback(true);
            console.log(data);
            socket.username = data;
            users.push(socket.username);
            updateUsernames();
        });
        
        function updateUsernames(){
            io.sockets.emit('get users', users);
        }
    });
}