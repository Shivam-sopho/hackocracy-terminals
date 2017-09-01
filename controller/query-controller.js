const _ = require("lodash");
const mongoose = require("mongoose");
//var {Query} = require("./../models/query");
var Query = mongoose.model('Query');

var insertQuery = function(req){
//	console.log(req.body);
	var queryInsert = new Query({
	  query : req.body.query,
	  heading : req.body.heading,
	  tags : req.body.tags
	});
	queryInsert.save().then((e)=>{
	  console.log("Date inserted to the query collection");
	  
	},(err)=>{
	  console.log(err);
	});
};


// To put list of all the queries on the feeds page
var getAllElements = function(req,callback){
  Query.find().then((query)=>{
    if(query){
    callback({"data":query});
   }
    else
    callback({"data":null});
  },(err)=>{
    console.log("No query found");
    callback({"data":null});
  });
}

// To put list of the queries posted by an user
var getElementByUserId = function(req,callback){
  Query.find({"userid":req.user.userid}).then((query)=>{
    callback({"data":query});
  },(err)=>{
    callback({"date":null});
  });  
};
// Get list of query via a particular tags
var getElementByTags = function(req,callback){
  Query.find({"tags":req.params.tags}).then((query)=>{   // How to handle a tags when its a array
    callback({"data":query});
  },(err)=>{
    callback({"data":null});
  });
};

// For searching a particular headings
var getElementByHeading = function(req,callback){
  Query.find({"heading":req.params.heading}).then((query)=>{
    if(!query)
    {
      return  callback({"data":null})
    }
    callback({"data":query})
  },(err)=>{
    console.log("some error occurred");
  });
  
};

// Get the elements by the date created
var getElementbyDate=function(req,callback){
  Query.find({"createdAt":req.params.date}).then((query)=>{
    if(!query){
      return callback({"data":null});
    }
    callback({"data":query})
   },(err)=>{
     callback({"data":null});
     console.log("Some error occurred");
   });
  };


// The following functions would be called form the calling functions

module.exports = {
 insertQuery,
 getAllElements,
 getElementByHeading,
// getElementByQuery,
 getElementByTags,
 getElementByUserId,
 getElementbyDate 
};

//1. How to save into the database when its a array of string like in tags
// 2 . How to save the address related thing in the database as its also an array
//3. Do we need to provide a function about listing about the address
