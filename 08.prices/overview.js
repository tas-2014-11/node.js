
Overview = function(){};
exports.Overview = Overview;

var Util = require('./util').Util;

Overview.init = function(app) {
  app.get('/overview',Overview.overview);
};

var gems_title_low = 'Low-Level Gemstones (Crafting Level 0-50)';
var gems_title_mid = 'Mid-Level Gemstones (Crafting Level 75-200)';
var gems_title_high = 'High-Level Gemstones (Crafting Level 225-400)';

Overview.overview = function(req,res) {
  ItemMaster.model.find({},function(err,items) {
    var mats_fields = ['rarity','tier','subtype','name'];
    var mats = Util.select(mats_fields,{type:'Crafting Material'},items);
    mats = Util.normalize(mats,mats_fields);
    Util.rename(mats,'Basic','Basic Crafting Materials');
    Util.rename(mats,'Fine','Fine Crafting Materials');
    Util.rename(mats,'Rare','Rare Crafting Materials');

    var gems_fields = ['type','tier','subtype','name'];
    var gems = Util.select(gems_fields,{type:'Gemstone'},items);

    var gems_low = Util.select(gems_fields,{tier:1},gems);
    gems_low = Util.normalize(gems_low,gems_fields);
    Util.rename(gems_low,'Gemstone',gems_title_low);

    var gems_mid = [].concat(
        Util.select(gems_fields,{tier:2},gems)
      , Util.select(gems_fields,{tier:3},gems)
    );
    gems_mid = Util.normalize(gems_mid,gems_fields);
    Util.rename(gems_mid,'Gemstone',gems_title_mid);

    var gems_high = [].concat(
        Util.select(gems_fields,{tier:4},gems)
      , Util.select(gems_fields,{tier:5},gems)
      , Util.select(gems_fields,{tier:6},gems)
    );
    gems_high = Util.normalize(gems_high,gems_fields);
    Util.rename(gems_high,'Gemstone',gems_title_high);

    var data = Util.mergeHashes([
        mats
      , gems_low
      , gems_mid
      , gems_high
    ]);
    var util = new Util();
    res.send(util.format(data));

    //var s = JSON.stringify(data,undefined,2);
    //console.log(s);
  });
};
