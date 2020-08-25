var mongoose =require('mongoose');

var plm=require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/blogapps2ss');

var userSchema= mongoose.Schema({
  username:String,
  password:String,
  email:String
});

mongoose.plugin(plm);

module.exports=mongoose.model('user', userSchema);