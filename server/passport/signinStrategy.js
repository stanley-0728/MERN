const LoginStrategy = require('passport-local').Strategy;
const User=require('../models/user');
const loginStrategy = new LoginStrategy({passReqToCallback:true},(req,username,password,done)=>{
    const email=req.body.email;
    const bcrypt=require('bcryptjs');
    User.findOne({email}).lean().exec((err, user) => {
        if (err) {
            return done(err, null);
        }
        if (!user) {
            return done(' Email or Password is incorrect', null);
        }
        const isPassword=bcrypt.compareSync(password,user.password);
        if(!isPassword)
        {
            return done('Email or password is incorrect',null);
        }
        user.username=username;
            return done(null, user);
});
}
)

module.exports=loginStrategy;