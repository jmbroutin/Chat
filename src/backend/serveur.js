var express = require('express');
var socket = require('socket.io');

var app = express();
var numbUsers = 0;
var login = "Nouvel utilisateur a rejoint";
var logout = "Utilisateur déconnecté";

server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

io = socket(server);

io.on("connection", (socket) => {
    console.log("New user connected");
    numbUsers +=1;
    socket.emit("NewConnect",login, numbUsers);
    socket.broadcast.emit("NewConnect",login, numbUsers);
    socket.on("disconnect", () => {
    console.log("User disconnected");
    numbUsers -=1;
    socket.broadcast.emit("Disconnect",logout, numbUsers);});
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
  });
});

// io.on('connection', function (socket, pseudo) {

//     socket.on('petit_nouveau', function(pseudo) {
//         socket.pseudo = pseudo;
//         console.log(pseudo);
//         socket.broadcast.emit('message', pseudo + ' vient de se connecter ! ');

//     });

//     socket.on('SEND_MESSAGE', function(data){
//             io.emit('RECEIVE_MESSAGE', data);
//            });
    
    

    // Dès qu'on nous donne un pseudo, on le stocke en variable de session
    

    // Dès qu'on reçoit un "message" (clic sur le bouton), on le note dans la console
    // socket.on('message', function (message) {
    //     // On récupère le pseudo de celui qui a cliqué dans les variables de session
    //     console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);
    // });