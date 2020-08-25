var mongoose =require('mongoose');

var postSchema= mongoose.Schema({
  writing:String,
  date:{
      type:Date,
      default:new Date
  }
})


module.exports=mongoose.model('post',postSchema);