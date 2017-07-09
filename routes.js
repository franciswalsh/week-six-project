const express = require('express');
const router = express.Router();
const models = require("./models");
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const loginSignup = require('./loginSignupFunctions.js');
const post = require('./postingFunctions.js');


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
  let username = req.body.usernameInputSignup;
  models.Users.findOne({
    where: {
      username: username
    }
  }).then(function(user){
    if (user === null){
      loginSignup.addUserToUsersTable(req);
      if (loginSignup.confirmPassword(req)){
        res.render('thankYou');
      } else {
        res.render('invalidSignup');
      }
    } else {
      res.send("username already exists");
    }
  });
});
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
      res.send("You don't have an account");
    } else {
      if (user.password === password){
        req.session.authenticated = true;
      } else {
        req.session.incorrectPasswordCount+=1;
        req.session.authenticated = false;
      };
      if (req.session.authenticated){
        req.session.username = username;
        req.session.password = password;
        req.session.userid = user.dataValues.id
        res.redirect('/homeScreen');
      } else {
        res.send("incorrect password");
      }
    }
    console.log(req.session);
  })
});
router.get('/homeScreen/', function(req, res){
  if (req.session.authenticated === true){
    res.render('homeScreen', {
      theSession: req.session
    });
  } else {
    res.send("not authenticated please go back and sign in");
  }
});
router.get('/createPost/', function(req, res){
  if (req.session.authenticated === true){
    res.render('createPost', {
      theSession: req.session
    });
  } else {
    res.send("not authenticated please go back and sign in");
  }
});
router.get('/yourProfile/', function(req, res){
  if (req.session.authenticated === true){
    res.render('yourProfile', {
      theSession: req.session
    });
  } else {
    res.send("not authenticated please go back and sign in");
  }
});
router.get('/logOut/', function(req, res){
  res.render('logout');
});
router.post('/newPost/', function(req, res){
  post.addPostToPostsTable(req);
  res.redirect('/mainFeed');
});
router.get('/mainFeed/', function(req, res){
  if (req.session.authenticated === true){
    models.Posts.findAll().then(function(posts){
      post.countingLikes(req, posts);
      res.render('mainFeed', {
        theSession: req.session,
        posts: posts
      })
    });
  } else {
    res.send("not authenticated please go back and sign in");
  }
});
router.post('/yesLogout/', function(req, res){
  req.session.destroy();
  res.redirect('/');
});
router.post('/noLogout/', function(req, res){
  res.redirect('/homeScreen/');
});
router.post('/likePost/:id', function(req, res){
  let postid = req.params.id;
  post.updateLikesTable(req);
  res.redirect('/mainFeed');
});
router.get('/likedBy/:id/', function(req, res){
  let postid = req.params.id;
  if (req.session.authenticated === true){
    models.Likes.findAll({
      where: {
        postid: postid
      },
      include: [
        {
          model: models.Users,
          as: 'UserWhoLiked'
        }
      ]
    }).then(function(findingUsers){
        let thePostWasLikeBy = []
        for (let i in findingUsers){
          thePostWasLikeBy.push(findingUsers[i].UserWhoLiked.username)
      }
        res.render('likedBy', {
          theSession: req.session,
          thisPostWasLikedBy: thePostWasLikeBy
        })
    })
  } else {
    res.send("not authenticated please go back and sign in");
  }
});
router.post('/homeScreen', function(req, res){
  res.redirect('/homeScreen');
});
router.post('/mainFeed', function(req, res){
  res.redirect('/mainFeed');
});
router.post('/createPost', function(req, res){
  res.redirect('/createPost');
});
router.post('/yourProfile', function(req, res){
  res.redirect('/yourProfile');
});
router.post('/logOut', function(req, res){
  res.redirect('/logOut');
});


module.exports = router;
