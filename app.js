var http = require('http')
  , express = require('express')
  , bodyParser = require('body-parser')
  , app = express()
  , server = http.createServer(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/capture', function(req, res, next){
  var data = req.body;
  return res.send(data);
})

app.use(express.static('./public'));


server.listen(3333);
