var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema(
  {
      answer: String,
      id : Schema.Types.ObjectId,
  }
);

module.exports = mongoose.model('Answer', answerSchema);
