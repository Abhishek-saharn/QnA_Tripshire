var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var secret = require('./config/secret');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var passport = require('passport');


var app=express();

app.use(morgan('dev'));

mongoose.connect(secret.database,function(err){
    if(err){
      console.log(err);
    }else{
      console.log('Connected to database');
    }
});


app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(passport.initialize());

app.use(function(req,res,next)
{
  res.locals.user=req.user;
  console.log(req.user);
  next();
});


var Question = require('./models/question');
var Answer = require('./models/answer');
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
