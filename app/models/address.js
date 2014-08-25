'use strict';

var Mongo = require('mongodb');


function Address(o){
  this.name     = o.name;
  this.color    = o.color;
  this.twitter  = o.twitter;
  this.userId   = o.userId;
  this.address  = o.address;
}


Object.defineProperty(Address, 'collection', {
  get: function(){return global.mongodb.collection('addresses');}
});

Address.create = function(address, cb){
  var a = new Address(address);
  console.log(a);
  Address.collection.save(a, cb);
};


Address.findAddresses = function(userId, cb){
  Address.collection.find({userId: userId.toString()}).toArray(function(err, obj){
    cb(obj);
  });
};

module.exports = Address;
