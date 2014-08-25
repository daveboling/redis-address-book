'use strict';


var User = require('../models/user');


exports.new = function(req, res){
  res.render('users/new');
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }
    else {
      res.redirect('/register');
    }

  });
};

exports.login = function(req, res){
  console.log('---RES.LOCALS---');
  console.log(res.locals);
  console.log('---RES.LOCALS END---');
  res.render('users/login');
};


exports.authenticate = function(req, res){
  User.authenticate(req.body, function(user){
    if(user){
      req.session.regenerate(function(){ //creates a brand new session for security purposes
        req.session.userId = user._id; //Everything written here is saved to Redis
        req.session.save(function(){
          res.redirect('/');
        });
      });
    }
    else {
      res.redirect('/login');
    }
  });
};

exports.logout = function(req, res){
  //destroys our specific session
  req.session.destroy(function(){
    res.redirect('/');
  });
};


