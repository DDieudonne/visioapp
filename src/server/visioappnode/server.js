let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', function (socket){
   console.log('connection');

  socket.on('CH01', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
  });

});

http.listen(3000, function () {
  console.log('listening on *:3000');
});