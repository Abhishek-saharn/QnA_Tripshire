var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var secret = require('../config/secret');
var User = require('../models/user');

passport.serializeUser(function(user,done){
  done(null,user._id);
});

passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    done(err,user);
  });
});

passport.use(new FacebookStrategy (secret.facebook,function(accessToken, refreshToken, profile, done){
    User.findOne({fbid:profile.id},function(err,user){
      if(err)return done(err);
      if(user){
        return done(null, user);
      }else{
        var newUser = new User();
        newUser.fbid = profile.id;
        newUser.name = profile.displayName;
        newUser.email = profile._json.email;

        newUser.save(function(err){
          if(err) throw err;

          return done(null,newUser);
        });
      }
    });
}));
