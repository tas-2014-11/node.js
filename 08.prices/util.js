
Util = function() {
  this.buf = [];
  this.depth = 0;
};

exports.Util = Util;

Util.dumpObj = function(obj,objname) {
  for(prop in obj) {
    console.log(objname+'['+prop+']='+obj[prop]);
  }
};

Util.select = function(fields,conditions,objs) {
  //Util.dumpObj(fields,'fields');
  //Util.dumpObj(conditions,'conditions');
  //Util.dumpObj(objs,'objs');

  var rows = [];

  nextdatarow:
  for(var i=0;i<objs.length;i++) {
    var obj = objs[i];

    // TODO: handle empty conditions
    for(var prop in conditions) {
      //console.log('testing '+prop+':'+conditions[prop]);
      if(obj[prop] != conditions[prop]) {
        continue nextdatarow;
      }
    }

    var row = {};
    for(var j in fields) {
      var field = fields[j];
      row[field] = obj[field];
    }
    rows.push(row);
  }

  console.log('Util.select() returning '+rows.length+' rows');
  return(rows);
};

function undefined(obj) {
  if(typeof(obj) == 'undefined') { return(true); }
  return(false);
}

// turn a denormalized table into a tree
Util.normalize = function(data,props) {
  var d = {};

  for(var row in data) {
    var cur = d;
    for(var i=0;i<props.length;i++) {
      var key = data[row][props[i]];
      var ii = i+1;

      if(typeof(props[ii]) == 'undefined') { //leaf
        cur.push(key);
      }
      else { //branch
        if(undefined(cur[key])) {
          if((ii+1) < props.length) {
            cur[key] = {};
          }
          else {
            cur[key] = [];
          }
        }
      }
      cur = cur[key];
    }
  }

  return(d);
};

// collapse an array of strings into a single big string
Util.collapse = function(arr) {
  var buf = '';
  for(var i=0;i<arr.length;i++) {
    buf = buf + arr[i] + '\n';
  }
  return(buf);
};

Util.prototype.buf = [];
Util.prototype.depth = 0;

Util.prototype.header = function(cls) {
  this.buf.push('<!DOCTYPE html>');
  this.buf.push('<html>');
  this.buf.push('  <head>');
  this.buf.push('  <title>'+new Date()+'</title>');
  this.buf.push('  <link rel="stylesheet" href="/stylesheets/style.css">');
  this.buf.push('  </head>\n<body>');

  this.div(cls);
  //this.buf.push(new Date());
};

Util.prototype.footer = function() {
  this.div();

  this.div('footer');
  this.push('<a href="/item/list" class="bigbutton">List Items</a>');
  this.push('<a href="/order/list" class="bigbutton">List Orders</a>');
  this.div();

  this.buf.push('</body>\n<html>');
};

Util.prototype.push = function(txt) {
  var prefix = '';
  for(var i=0;i<this.depth;i++) {
    prefix = prefix+'  ';
  }
  this.buf.push(prefix+txt);
};

Util.prototype.div = function div(cls) {
  if(typeof(cls) == 'undefined') {
    this.depth--;
    this.push('</div>');
    return;
  }
  this.push('<div class="'+cls+'">');
  this.depth++;
};

Util.prototype.a = function(href,txt) {
  var s = '<a href="' + href + '">' + txt + '</a>';
  this.push(s);
};

Util.prototype.namelink = function(name) {
  this.a('/order/new/'+name,name);
};

Util.insertColumnHeadings = function(data) {
  for(var type in data) {
    //console.log('type='+type);
    //console.log('data['+type+']='+data[type]);

    data[type]['0'] = {};
    for(var tier in data[type]) {
      for(var subtype in data[type][tier]) {
        data[type]['0'][subtype] = [];
      }
    }
  }
};

Util.prototype.format = function(data) {
  this.header('overview');

  Util.insertColumnHeadings(data);

  for(var type in data) {
    this.div('typelabel');
    this.buf.push(type);
    this.div();

    this.div('type');

    for(var tier in data[type]) {
      this.div('tier');

      this.div('tierlabel');
      if(tier > 0) {
        this.push('Tier '+tier);
      }
      this.div();
 
      for(var subtype in data[type][tier]) {
        if(0 == tier) {
          this.div('subtype bottomborder');

          this.div('subtypelabel');
          this.push(subtype);
          this.div();
        }
        else {
          this.div('subtype');
        }

        for(var name_idx in data[type][tier][subtype]) {
          this.div('name');

          var name = data[type][tier][subtype][name_idx];
          //console.log(type+':'+tier+':'+subtype+':'+name);
          //this.push(name);
          this.namelink(name);

          this.div(); //name
        }
        this.div(); //subtype
      }
      this.div(); //tier
      tier++;
    }
    this.div(); //type
  }
  this.footer();

  s = Util.collapse(this.buf);
  return(s);
};

Util.rename = function(data,oldkey,newkey) {
  data[newkey] = data[oldkey];
  delete(data[oldkey]);
};

Util.mergeHashes = function(hashes) {
  var data = {};
  for(var i=0;i<hashes.length;i++) {
    var hash = hashes[i];
    for(key in hash) {
      data[key] = hash[key];
    }
  }
  return(data);
}
