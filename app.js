const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());

app.use(session({
  // genid: function(req),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname));
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');

app.get('/', function(req, res){
  res.send("hello world");
})

app.listen(3000, function(){
  console.log('Successfully started express application!');
})
