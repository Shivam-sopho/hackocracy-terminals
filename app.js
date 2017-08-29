// import packages
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var ejs = require('ejs');
var _ = require("lodash");

mongoose.connect('mongodb://localhost/hackocracyterminals');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

// Initialize app
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views')); // Views folder will handle views
// set 'handlebars' as app.engine and defaultLayout file as 'Layout'
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'ejs'); // set view engine to handlebars

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 3000));

// Initializing routers
app.get("/",(req,res)=>{
  res.render("homepage");
});

app.post("/login",(req,res)=>{
  res.render("login");
});
//Using lodash module .
app.post("/register",(req,res)=>{
  res.render("register");
  //var body= _.pick(req.body,['email','password']);
  //Will be done according the register form given
  var newUser = User(body);
  newUser.save().then((user)=>{
    res.status(200).send();
  },(err)=>{
    res.status(400).send();
  })
});

app.get("/feeds",(req,res)=>{
  res.render("feeds");
});
//Requires authenticate specially for admins
app.get("/adminportal",(req,res)=>{
  res.render("adminportal")
});

app.get("/publicportal",(req,res)=>{
  res.render("publicportal");
});
// Submission of questions or the query
app.post("/queryposting",(req,res)=>{
  res.render("queryposting");
  var body = _.pick(req.body,[]);// Do be done according to the body page 
  
  
});

app.post("/adminposting",(req,res)=>{
  res.render("adminposting");
  var body = _.pick(req.body,[])// To be done according to the adminposting page;
});
// Query initilization according to that of catogory
app.get("/feeds/:id",(req,res))=>{
  
});
 
//Main page that comes after that of the logining the user in
app.get("/dashboard/:id",(req,res)=>{
  res.render("dashboard");
});
app.listen(app.get('port'), function() {
	console.log('Server started on port '+ app.get('port'));
});
