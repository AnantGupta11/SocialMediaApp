class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox= $(`#${chatBoxId}`);
        this.userEmail=userEmail;

        this.socket=io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self=this;
        this.socket.on('connect', function(){
            console.log('Connection Establish using socket');
            

            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom: 'social'
            });


            self.socket.on('user_join',function(data){
                console.log('A user joined!',data);
            });
            
            //send a message on clicking the send message button

            $('#send-message').click(function(){
                let msg= $('#chat-message-input').val();

                if(msg!=''){
                    self.socket.emit('send-message',{
                        message:msg,
                        user_email:self.userEmail,
                        chatroom: 'social'
                    });
                }
            });

            self.socket.on('receive_message', function(data){
                console.log('message_received',data.message);

                let newMessage= $('<li>');

                let messageType= 'other-message';
                if(data.user_email==self.userEmail){
                    messageType='self-message';
                }

                newMessage.append($('<span>',{
                    'html':data.message
                }));
                newMessage.append($('<sub>',{
                    'html':data.user_email
                }));
                newMessage.addClass(messageType);
                $('#chat-messages-list').append(newMessage);
            })
            self.socket.on('output-msg', function(data){
                // console.log(data);
                console.log('message_received',data);
                if(data.length){
                    data.forEach(msg=>{
                        let newMessage= $('<li>');

                        let messageType= 'other-message';
                        if(msg.sender==self.userEmail){
                            messageType='self-message';
                        }

                        newMessage.append($('<span>',{
                            'html':msg.message
                        }));
                        newMessage.append($('<sub>',{
                            'html':msg.user_email
                        }));
                        newMessage.addClass(messageType);
                        $('#chat-messages-list').append(newMessage);
                            })
                        }
            })
        })
    }
    
}
// fetching initial chat messages from the database
// (function() {
//     fetch("/chats")
//       .then(data => {
//         return data.json();
//       })
//       .then(json => {
//         json.map(data => {
//           let li = document.createElement("li");
//           let span = document.createElement("span");
//           messages.appendChild(li).append(data.message);
//           messages
//             .appendChild(span)
//             .append("by " + data.sender + ": " + formatTimeAgo(data.createdAt));
//         });
//       });
//   })();