module.exports={
    var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require('ejs');
var _ = require("lodash");
const flash = require('connect-flash');

const {User} = require("./models/user");// Now can access all the user.js Schema via that of User variable
const {Query} = require("./models/query"); // Now can access all the function of the query.js schema
const {Admin} = require("./models/adminpost");
const {Vote} = require("./models/vote");
const {Comment}= require("./models/comment");
const {CommentAdmin} = require("./models/commentadmin");// Admin Comment controller
const comment_ctrl_query  = require("./controller/comments");// Comment controller
const query_controller = require("./controller/query-controller");
const admin_controller = require("./controller/admin-controller");
const comment_ctrl_admin = require("./controller/commentadmin");
const library = require("./lib/lib");
const vote = require("./controller/vote");
require("./models/reply")
const reply = require("./controller/reply")
const user = require("./controller/user")
mongoose.connect(process.env.MONGOLAB_URI||"mongodb://localhost:27017/hackocracy");
var db = mongoose.connection;
var app = express();
var async = require('async')
}
