'use strict'
var mongoose = require('mongoose');
var comment =mongoose.model('Comment');

var insertComment = function(req,callback){
  var newComment = comment({
     comment : req.body.comment,
     queryid : req.body.query,
     userid  : req.user._id
     
  });
  newComment.save().then((result)=>{
    console.log("data inserted into the comment query database");
    callback({"res":true});
  },(err)=>{
    console.log("data not insertComment");
    callback({"res":false});
  });
};

var getAllCommentByQuery = function(req,callback){
  comment.find({"queryid":req.params.qid}).then((result)=>{
    if(!result){
      return callback({"data":null});
    }
    callback({"data":result});
  },(err)=>{
    console.log("some Error occurred");
  });
};

var countComments = function(req,callback){
  comment.count({"queryid":req.params.qid}, function( err, count){
        console.log( "Number of comments: ", count );
        callback({"data":count});
    });  
};

module.exports = {
  countComments,
  insertComment,
  getAllCommentByQuery
}
