const express=require('express');
const router=express.Router();
const passport=require('../passport');

const SignupInput=require('../validator/register')
const LoginInput = require("../validator/login");

/*router.post('/signup',(req,res,next)=>{
    //Form Valdiation
    const {errors, isValid} = SignupInput(req.body);

    if (!isValid) {
       return res.status(400).json(errors);
    }
    passport.authenticate('local-signup',(error,user,info)=>{
        if(error)
        {
         return res.status(500).json({
             message:error||'oops something occurred'
       });
        }
        req.logIn(user,(error)=>{
            if(error)
        {
         return res.status(500).json({
             message:error||'oops something occurred'
       });
        }
        user.isAuthenicated=true;
        console.log(user);
        return res.json(user);
        });
    })(req,res,next);
});
*/
router.post('/signup',(req,res,next)=>{
    //Form Valdiation
    const {errors, isValid} = SignupInput(req.body);

    if (!isValid) {
       return res.status(400).json(errors);
    }
    
    passport.authenticate('local-signup',(error,user,info)=>{
        if(error)
        {
         return res.status(500).json({
             message:error||'oops something occurred'
       });
        }
        req.logIn(user,(error)=>{
            if(error)
        {
         return res.status(500).json({
             message:error||'oops something occurred'
       });
        }
      

        return res.json(user);
        });
    })(req,res,next);
});
router.post('/signin',(req,res,next)=>{
    //Form Valdiation
    const {errors, isValid} = LoginInput(req.body);

    if (!isValid) {
       return res.status(400).json(errors);
    }
    passport.authenticate('local-signin',(error,user,info)=>{
        if(error)
        {
         return res.status(500).json({
             message:error||'oops something occurred'
       });
        }
        req.logIn(user,(error)=>{
            if(error)
        {
         return res.status(500).json({
             message:error||'oops something occurred'
       });
        }
        user.isAuthenicated=true;console.log(user);
        user.username=req.body.username;
        return res.json(user);
        });
    })(req,res,next);
});

router.post('/logout', (req, res) => {
    if (req.user) {
         res.clearCookie('session.sig') // clean up!
        
        req.logout()
        res.send({ msg: 'loggging out' })
    } else {
        res.send({msg: 'no user to logout'})
    }
});
module.exports=router;