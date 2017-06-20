module.exports = {
  database:'mongodb://root:abc123@ds129402.mlab.com:29402/tripshire',
  port: 3000,
  secretKey:"!Abhi!",

  facebook : {
    clientID :process.env.FACEBOOK_ID||'111528899460454',
    clientSecret : process.env.FACEBOOK_SECRET ||'cd27a0cb56cf84b720a4fac64e3b2463',
    fiels: ['displayName'],
    callbackURL:'https://queriesnsols.herokuapp.com/auth/facebook/callback',
  },
  google: {
    clientID :'1022620327825-9rqpq8flgsu1d9o3gjhrm27oqr7n3no6.apps.googleusercontent.com',
    clientSecret:'lYTtCLQ_lLcsBjCQ0E35CCtX',
    callbackURL: "https://queriesnsols.herokuapp.com/auth/google/callback",
   passReqToCallback   : true

  }


}
