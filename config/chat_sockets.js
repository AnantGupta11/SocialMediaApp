
module.exports.chatSockets= function(socketServer){
    let io= require('socket.io')(socketServer,{
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"]
        }
    });

    io.sockets.on('connection', function(socket){
        console.log('New COnnection received',socket.id);
    
        socket.on('disconnect', function(){
            console.log('socket disconnect');
        })
    });


}