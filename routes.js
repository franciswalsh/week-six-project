const express = require('express');
const router = express.Router();
const models = require("./models");
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const loginSignup = require('./loginSignupFunctions.js');


router.get('/signup/', function(req, res){
  res.send("this is the signup router.get")
});
router.post('/signup/', function(req, res){
  // res.send("this is the signup router.send")
  res.render('signup');
});
router.get('/login/', function(req, res){
  res.send("this is the signup router.get")
});
router.post('/login/', function(req, res){
  // res.send("this is the login router.send")
  req.session.incorrectUsernameCount = 0;
  req.session.incorrectPasswordCount = 0;
  res.render('login');
});
router.post('/signupPage/', function(req, res){
  loginSignup.addUserToUsersTable(req);
  res.send(loginSignup.confirmPassword(req));
})
router.post('/loginPage/', function(req, res){
  let username = req.body.usernameInputLogin;
  let password = req.body.passwordInputLogin;
  models.Users.findOne({
    where: {
      username: username
      // password: password
    }
  }).then(function(user){
    if (user === null){
      req.session.incorrectUsernameCount+=1;
      req.session.authenticated = false;
      res.send("incorrect username");
    } else {
      if (user.password === password){
        req.session.authenticated = true;
      } else {
        req.session.incorrectPasswordCount+=1;
        req.session.authenticated = false;
      };
      if (req.session.authenticated){
        res.send("successful login");
      } else {
        res.send("incorrect password");
      }
    }
    console.log(req.session);
  })
})

module.exports = router;
