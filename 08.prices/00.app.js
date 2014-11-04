#!/usr/bin/env node

var express = require('express');
var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  app.locals.pretty = true;
  app.use(express.logger('dev'));
});

app.get('/',function(req,res) {
  res.render('menu.jade',{title:'Menu'});
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/prices');

var Items = require('./items').Items;
Items.init(app);

var Overview = require('./overview').Overview;
Overview.init(app);

var Orders = require('./orders').Orders;
Orders.init(app);

var http = require('http');
http.createServer(app).listen(8080);
console.log('listening');
