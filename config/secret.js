module.exports = {
  database:'mongodb://root:abc123@ds129402.mlab.com:29402/tripshire',
  port: 3000,

  facebook : {
    clientID :process.env.FACEBOOK_ID||'111528899460454',
    clientSecret : process.env.FACEBOOK_SECRET ||'cd27a0cb56cf84b720a4fac64e3b2463',
    fiels: ['emails','displayName'],
    callbackURL:'http://localhost:3000/auth/facebook/callback',
  }


}
