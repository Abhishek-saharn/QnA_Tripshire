var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var secret = require('./config/secret');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var passport = require('passport');
var session = require('express-session');
var cp = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);


mongoose.connect(secret.database,function(err){
    if(err){
      console.log(err);
    }else{
      console.log('Connected to database');
    }
});



var app=express();



app.use(morgan('dev'));
app.use(cp());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({ secret: secret.secretKey, resave: true, saveUninitialized: true,store: new MongoStore({url:secret.database,autoReconnect: true}) }));


app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next)
{
  res.locals.user=req.user;
  next();
});

app.use(express.static(__dirname+'/public'));





var Question = require('./models/question');
var Answer = require('./models/answer');
var User = require('./models/user');
app.use(function(req,res,next){
    Question.find({},function(err,questions){
      if(err)return next(err);
      res.locals.qs = questions;
      next();
    });
});

app.engine('ejs',engine);
app.set('view engine','ejs');

var mainRoutes = require('./routes/main');
app.use(mainRoutes);




 app.listen(process.env.PORT||secret.port,function(err){
   if(!err){
     console.log('server running');
   }else{
     console.log(err);
   }
 });
