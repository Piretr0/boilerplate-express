let express = require('express');
let app = express();
let bodyParser = require('body-parser');
// app.get("/", function(req, res){
//     console.log("Hello Express");
//   res.send('Hello Express');
// });
process.env.MESSAGE_STYLE = "uppercase";
require('dotenv').config()

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  
  res.sendFile(__dirname + "/views/index.html");
});

app.use(function(req, res, next) {
 console.log(req.method +" "+ req.path +" - "+ req.ip);
  next();
})

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time});
});

app.get("/:word/echo", function(req, res) {
  res.json({echo: req.params.word});
});

app.get("/name", function(req, res) {
  let firstName = req.query.first;
  let lastName = req.query.last;
  res.json({name: firstName + " " + lastName});
});


app.use(bodyParser.urlencoded({ extended: false }))

app.post("/name", function(req, res) {
  let firstName = req.body.first;
  let lastName = req.body.last;
  res.json({name: firstName + " " + lastName});
});

 module.exports = app;
