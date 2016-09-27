var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ItemSchema = new Schema({
  task: String,
  complete: { 
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model('Item', ItemSchema);
