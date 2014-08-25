'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    home           = require('../controllers/home'),
    users          = require('../controllers/users'),
    addresses      = require('../controllers/addresses'),
    session        = require('express-session'), //Creates cookies
    RedisStore     = require('connect-redis')(session),
    security       = require('../lib/security');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());
  app.use(session({
    store: new RedisStore(),
    secret: 'keyboard cat',
    resave:true,
    saveUnitialized:true,
  cookie:{maxAge:null}}));

  //authentication step
  //Ask Scott about function def.
  app.use(security.authenticate);

  //Anonymous Routes
  app.get('/', home.index);
  app.get('/register', users.new);
  app.post('/register', users.create);
  app.get('/login', users.login);
  app.post('/login', users.authenticate);

  app.use(security.bounce);

  //Authenticated users
  app.delete('/logout', users.logout);
  app.get('/addresses', addresses.index);
  app.get('/addresses/new', addresses.new);
  app.post('/addresses/new', addresses.create);


  console.log('Express: Routes Loaded');
};

