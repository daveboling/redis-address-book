'use strict';

var User = require('../models/user');


exports.authenticate = function(req, res, next){
  if(!req.session.userId){ return next(); }
  //look it up
  User.findById(req.session.userId, function(user){
    res.locals.user = user; //modify response to have the user on every other route
    //How does response now have this without a return val?
    next();
  });
};

//Prevents user from accessing routes without
//being logged in
exports.bounce = function(req, res, next){
  if(res.locals.user){
    next();
  }
  else {
    res.redirect('/login');
  }
};
