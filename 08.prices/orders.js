
Orders = function(){};
exports.Orders = Orders;

var ItemMaster = require('./db-itemmaster').ItemMaster;
var Defaults = require('./defaults').Defaults;
var OrderModel = require('./db-ordermodel').OrderModel;

Orders.init = function(app) {
  app.get('/test',Orders.test);
  app.get('/order/new',Orders.nosuchpage);
  app.get('/order/new/:name',Orders.new_get);
  app.post('/order/new',Orders.new_post);
  app.get('/order/list',Orders.list);
  app.get('/order/edit',Orders.nosuchpage);
  app.get('/order/edit/:id',Orders.nosuchpage);
  app.get('/order/export',Orders.export);
  app.get('/order/delete',Orders.nosuchpage);
  app.get('/order/delete/:id',Orders.nosuchpage);

  Orders.statics = { values:[] };
  for(var i=1;i<=40;i++) {
    Orders.statics.values.push(i);
  }
};

Orders.test = function(req,res) {
  res.render('test.jade',{
      text: 'Foo'
    , defaults: ['a','b','c']
  });
};

Orders.nosuchpage = function(req,res) {
  res.render('nosuchpage.jade');
};

Orders.new_get = function(req,res) {
  Defaults.order.date = new Date();
  res.render('ordernew.jade',{
      name:req.param('name')
    , title:'New Order'
    , statics:Orders.statics
    , defaults:Defaults.order
  });
};

Orders.new_post = function(req,res) {
  var order = OrderModel.model({
      name:	req.param('name')
    , buy:	req.param('buy')
    , sell:	req.param('sell')
    , date:	req.param('date')
    , who:	req.param('who')
  });

  order.save(function(err) {
    if(err) { console.log(err); }
    res.redirect('/order/list');
  });

  console.log('saved (' + order.name + ',' + order.buy + ',' + order.sell + ')');
};

Orders.list = function(req,res) {
  OrderModel.model.find({},function(err,orders) {
    res.render('orderlist.jade',{title:'Order List',orders:orders});
  });
};

Orders.export = function(req,res) {
  OrderModel.model.find({},function(err,orders) {
    res.send(JSON.stringify(orders,undefined,2));
  })
};

