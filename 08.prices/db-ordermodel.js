
OrderModel = function(){};
exports.OrderModel = OrderModel;

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/prices');

//http://mongoosejs.com/docs/validation.html

OrderModel.schema = mongoose.Schema({
    name	: { type:String, required:true, index:true }
  , buy		: { type:Number }
  , sell	: { type:Number }
  , date	: { type:Date }
  , who		: { type:String }
});

OrderModel.model = mongoose.model('OrderModel',OrderModel.schema);
