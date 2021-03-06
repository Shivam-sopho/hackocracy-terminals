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
  comment.find({"queryid":req.params.qid},function(err,result){
        if(err){
        throw err;
        }
    else{
            }
    }).populate("userid").exec(function(err,results){
        if(err){
            throw err;
        }
        else{
            callback({"data":results});
        }  
    })
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
