var express = require('express');
var router = express.Router();
var User =require('./users');
var post=require('./post');
var passport=require('passport');
var localstrategy=require('passport-local');

passport.use(new localstrategy (User.authenticate()));

router.get('/', function(req, res) {
  res.render('index');
});


router.post('/reg',function(req,res){
  var newUser=new User({
    username:req.body.username,
    email:req.body.email,
  })
  User.register(newUser,req.body.password)
  .then(function(registereduser){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile');
    })
  })
});

router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/',
}),function(req,res){});

router.get('/profile',isLoggedin,function(req,res){
  res.render('profile')
})

router.get('/logout',function(req,res){
  req.logOut();
  res.redirect('/');
});


router.get('/allpost',isLoggedin,function(req,res){
  post.find()
  .then(function(allpost){
    res.send(allpost)
  })
})

router.post('/post',function(req,res){
  post.create({
    writing:req.body.post
  })
  .then(function(createdpost){
    res.redirect('/allpost')
  })
});

function isLoggedin(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }
}

module.exports = router;
