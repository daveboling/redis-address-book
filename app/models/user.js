'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb');

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.register = function(o, cb){
  User.collection.findOne({email: o.email}, function(err, user){
    if(user){return cb();}

    //One Way Hash - Takes something like a password, runs it through a filter, and it comes out encrypted. Cannot
    //be reverse engineered. Ex. MD5, MD1
    //npm bcrypt will take care of this for us

    o.password = bcrypt.hashSync(o.password, 10);

    User.collection.save(o, cb);
  });
};

User.authenticate = function(o, cb){
  User.collection.findOne({email: o.email}, function(err, user){
    if(!user){return cb();}
    //Compares plain text password against the user.password. bcrypt pulls out the salt automatically
    var isOk = bcrypt.compareSync(o.password, user.password);
    if(!isOk){return cb();}

    cb(user);
  });
};

User.findById = function(query, cb){
  var id = Mongo.ObjectID(query);
  User.collection.findOne({_id: id}, function(err, obj){
    cb(obj);
  });
};


User.all = function(cb){
  User.collection.find().toArray(cb);
};

module.exports = User;

