var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fbid:String,
    name:String,
    email:String,
});

module.exports = mongoose.model('User',userSchema);