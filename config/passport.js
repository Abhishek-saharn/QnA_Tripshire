var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var secret = require('../config/secret');
var User = require('../models/user');

passport.serializeUser(function(user,done){
  console.log('InSU'+user);
  done(null,user);

});

passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    done(err,user);
  });
});

passport.use(new FacebookStrategy (secret.facebook,function(accessToken, refreshToken, profile, done){
    User.findOne({id:profile.id},function(err,user){    // emailId can be compared for uniqueness...
      if(err)return done(err);
      if(user){
        return done(null, user);
      }else{
        var newUser = new User();
        newUser.id = profile.id;
        newUser.name = profile.displayName;
        newUser.save(function(err){
          if(err) throw err;

          return done(null,newUser);
        });
      }
    });
}));

passport.use(new GoogleStrategy(secret.google,function(request, accessToken, refreshToken, profile, done){
        User.findOne({id:profile.id},function(err,user){
          if(err)return done(err);
          if(user){
            done(null,user);
          }else{
            var newUser = new User();
            newUser.id = profile.id;
            newUser.name = profile.displayName;
            newUser.save(function(err){
                if(err) throw err;
                return done(null,newUser);
            });
          }
        });
}));
