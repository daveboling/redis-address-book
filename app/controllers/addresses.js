'use strict';

var Address = require('../models/address');

exports.index = function(req, res){
  Address.findAddresses(res.locals.user._id, function(addresses){
    res.render('addresses/index', {addresses: addresses});
  });
};

exports.new = function(req, res){
  res.render('addresses/new');
};

exports.create = function(req, res){
  Address.create(req.body, function(){
    res.redirect('/addresses/new');
  });
};

