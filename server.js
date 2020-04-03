const io = require('socket.io')(3000);

var userColors = 
[
    "#83aaf2",
    "#f2859f",
    "#8ced85",
    "#edba82",
    "#cccbca",
    "#f3f59f",
    "#e89aed",
    "#7ad6c4",
    "#f2bfb8",
    "#f5c4f0"
];

var users = {}
var color = {}
var numberUsersColor = 0;

io.on('connection', function(socket)
{
    socket.on('new-user', function(name) 
    {
        users[socket.id] = name;
        color[socket.id] = userColors[numberUsersColor];
        socket.broadcast.emit('user-connected', {name: name, color: color[socket.id]});
        socket.emit('user-color', color[socket.id]);
        numberUsersColor = numberUsersColor + 1;
        if(userColors.length <= numberUsersColor)
        {
            numberUsersColor = 0;
        }
    })
    socket.on('send-chat-message', function(message)
    {
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id], color: color[socket.id]});
    })
    socket.on('disconnect', function()
    {
        socket.broadcast.emit('user-disconnected', {name: users[socket.id], color: color[socket.id]});
        numberUsersColor = numberUsersColor - 1;
        delete users[socket.id];
    })
})