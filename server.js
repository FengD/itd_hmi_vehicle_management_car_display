var app = require('express')();
var server = require('http').Server(app);
var WebSocket = require('ws');
var wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('server: receive connection.');

    ws.on('message', function incoming(message) {
        console.log('server: received: %s', message);
    });
    var data =[
      {
        year: 1991,
        value: 1
      },
      {
        year: 1992,
        value: 2
      },
      {
        year: 1993,
        value: 3
      },
      {
        year: 1994,
        value: 4
      },
      {
        year: 1995,
        value: 5
      },
      {
        year: 1991,
        value: 1
      },
      {
        year: 1992,
        value: 2
      },
      {
        year: 1993,
        value: 3
      },
      {
        year: 1994,
        value: 4
      },
      {
        year: 1995,
        value: 5
      },
    ]
    function f1() {
      // data[8].value = Math.random().toFixed(2)*100
      var temp_v = Math.random().toFixed(2)*100
      var temp_y = Math.random().toFixed(3)*2000
      for (var i = 0; i < data.length; i++) {
        if (i != data.length-1)
        {
          data[i].value = data[i+1].value
          data[i].year = data[i+1].year
        }
        else
        { 
          data[i].value = temp_v  
          data[i].year = temp_y
        }
      }
      // data[data.length-1].value = temp_v  
      // data[data.length-1].year = temp_y
      console.log(data)
      var messageJson = JSON.stringify(data);
      ws.send(messageJson);
    }
    setInterval(f1,2000);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.listen(3000);