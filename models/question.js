var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema(
  {
      question :{type: String,default:"NA"},

  });

module.exports = mongoose.model('Question',questionSchema);
