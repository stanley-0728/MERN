
const SignupStrategy = require('passport-local').Strategy;
const User=require('../models/user');
const signupStrategy = new SignupStrategy({passReqToCallback:true},(req,username,password,done)=>{
    const email=req.body.email;
    const isAuthenicated=true;
    const bcrypt=require('bcryptjs');
    const salt=bcrypt.genSaltSync(10)

    User.findOne({email}).lean().exec((err, user) => {
        if (err) {
            return done(err, null);
        }
        if (user) {
            return done(' User Already Exists', null);
        }
        const hashPassword=bcrypt.hashSync(password,salt);
        let newUser = new User({
            username,
            email,
            password:hashPassword,
            isAuthenicated
        });
        newUser.save((error, inserted) => {
            if (error) {
                return done(error, null);
            }
            delete inserted.password;
            console.log(inserted)
            return done(null, inserted);
        });
});
}
)
module.exports=signupStrategy;