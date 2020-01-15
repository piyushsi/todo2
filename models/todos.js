var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    desc: {
      type: String,
      required: true,
      minlength: 4
    },
    iscompleted: {
      type: Boolean,
      default: false
  
    }
  }, { timestamps: true }); 
  
  // var User = mongoose.model('User', userSchema);
  
  // module.exports = User;
  
  module.exports = mongoose.model('User', userSchema);