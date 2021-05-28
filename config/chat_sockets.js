
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

        socket.on('join_room', function(data){
            console.log('joining request rec..',data);
            socket.join(data.chatroom);
            
            io.in(data.chatroom).emit('user_join',data);
        });

        //detect send_message and broadcast to everyone in the room
        socket.on('send-message', function(data){
            io.in(data.chatroom).emit('receive_message',data);
        })
    });


}