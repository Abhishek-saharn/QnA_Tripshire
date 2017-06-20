var router = require('express').Router();
var passport = require('passport');
var passportConf = require('../config/passport');

var Question = require('../models/question');
var Answer = require('../models/answer');


router.route('/')
      .get(function(req,res){
        res.render('main/login');
      });

router.route('/home')
      .get(function(req,res){
        res.render('main/home');
      });

router.route('/saveQuestion')
      .post(function(req,res){
        var question = new Question();
        question.question=req.body.text;

        question.save(function(err,question){
                if(err)console.log(err);
                else{
                     res.send({status:"Success"});

                }
        });


      });



router.route('/answers/:aid')
      .get(function(req,res){
        var ans = [];
        var ques;
        Question.findOne({_id:req.params.aid},function(err,qustn){
          ques=qustn.question;
          Answer.find({},function(err,answers){
              if(err)console.log(err);
              for(var i=0;i<answers.length;i++){
                if(answers[i].id.equals(req.params.aid)){
                    ans.push(answers[i].answer);

                  }
              }
              res.render("main/answers",{aget:ans,question:ques});
          });
        });



      })
      .post(function(req,res){
        console.log('working');
        var answer = new Answer();
        answer.id = req.params.aid;
        answer.answer = req.body.text;
        answer.save(function(err){
            if(err) console.log(err);
            else{res.send({status:"Success"});}
        });

      });

  router.get('/auth/facebook',passport.authenticate('facebook',{scope:'email'}) );
  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),function(req, res) {
      res.redirect('/home');
   });
module.exports = router;
