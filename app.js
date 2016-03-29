var http = require('http')
  , express = require('express')
  , bodyParser = require('body-parser')
  , nodemailer = require("nodemailer")
  , app = express()
  , server = http.createServer(app)
  , creds = require('./gmail_auth.json');


// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: creds
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/capture', function(req, res, next){
  var data = req.body;
  var mailOptions = {
      from: "Nathan White <nw@nwhite.net>", // sender address
      replyTo: data.name + '<' + data.email + '>',
      to: "nw@nwhite.net", // list of receivers
      subject: "[WebForm] - " + data.name , // Subject line
      text: JSON.stringify(data, null, 4), // plaintext body
      html: JSON.stringify(data, null, 4) // html body
  }
  
  smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log("Message sent: " + response.message);
      }
  });
  
  return res.send("Thank You!");
})

app.use(express.static('./public'));


server.listen(3333);
