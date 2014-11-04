
Items = function(){};
exports.Items = Items;

var fs = require('fs');

var ItemMaster = require('./db-itemmaster').ItemMaster;
var Defaults = require('./defaults').Defaults;

Items.init = function(app) {
  app.get('/item',function(req,res){res.redirect('/item/list');});
  app.get('/item/list',Items.list);
  app.get('/item/export',Items.export);
  app.get('/item/new',Items.new);
  app.post('/item/new',Items.new_post);
  app.get('/item/edit/:id',Items.edit);
  app.post('/item/edit/:id',Items.edit_post);
  app.get('/item/delete/:id',Items.delete);
  app.get('/item/import',Items.import);
};

Items.list = function(req,res) {
  ItemMaster.model.find({},function(err,items) {
    res.render('itemmaster.jade',{title:'Item Master',items:items});
  })
};

Items.export = function(req,res) {
  ItemMaster.model.find({},function(err,items) {
    var s = JSON.stringify(items,undefined,2);
    res.send(s);
  })
};

Items.new = function(req,res) {
  res.render('itemnew.jade', {
      title: 'New Item'
    , statics: ItemMaster.statics
    , defaults: Defaults.item
  });
};

Items.new_post = function(req,res) {
  var item = ItemMaster.model({
      name:	req.param('name')
    , rarity:	req.param('rarity')
    , tier:	req.param('tier')
    , type:	req.param('type')
    , subtype:	req.param('subtype')
    , value:	req.param('value')
    , value_gems:	req.param('value_gems')
    , value_karma:	req.param('value_karma')
    , usedby:	req.param('usedby')
    , level:	req.param('level')
    , aquisition:	req.param('aquisition')
  });

  item.save(function(err) {
    if(err) {
      console.log(err);
      res.redirect('/item/list');
    }
    else {
      res.redirect('/item/new');
    }
  });

  console.log('saved "' + req.param('name') + '"');
};

Items.edit = function(req,res) {
  ItemMaster.model.findById(req.params.id,function(err,item) {
    res.render('itemedit.jade',{
        title: 'Item Edit'
      , item: item
      , statics: ItemMaster.statics
    });
  })
};

Items.edit_post = function(req,res) {
  var conditions = {_id:req.param('_id')};
  var update = {
      rarity:req.param('rarity')
    , tier:req.param('tier')
    , value:req.param('value')
    , value_gems:req.param('value_gems')
    , value_karma:req.param('value_karma')
    , type:req.param('type')
    , subtype:req.param('subtype')
    , level:req.param('level')
  };

  console.log('conditions="'+conditions._id+'"');
  console.log('update='+JSON.stringify(update,undefined,2));

  ItemMaster.model.update(conditions,update,{},function(err,count,raw) {
    if(err) {
      console.log(err);
      res.redirect('/item/list');
    }
    console.log('updated ' + count + ' rows');

    var s = JSON.stringify(raw,undefined,2);
    console.log('mongo says "' + s + '"');

    res.redirect('/item/list');
  });
};

Items.delete = function(req,res) {
  ItemMaster.model.findById(req.params.id,function(err,item) {
    if(err) {
      console.log(err);
      res.redirect('/item/list');
    }

    item.remove(function(err) {
      if(err) {
        console.log(err);
        res.redirect('/item/list');
      }
    });
    res.redirect('/item/list');
  })
};

Items.import = function(req,res) {
  fs.readFile('data.txt',function(err,data) {
    if(err) {
      console.log(err);
      //throw(err);
      res.redirect('/');
    }
    else {
      var d = JSON.parse(data);
      for(var i=0;i<d.length;i++) {
        delete(d[i]._id);
        delete(d[i].__v);
        var item = new ItemMaster.model(d[i]);
        item.save(function(err) {
          if(err) { console.log(err); }
        });
      }
      //console.log(d);
      res.send(d);
    }
  });
  //res.render('nosuchpage.jade');
};
