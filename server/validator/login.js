const Validator =require('validator');
const isEmpty = require('is-empty');


module.exports=function LoginInput(data){

    let errors = {};
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.username)) {
        errors.username = "Name field is required";
    }

    //Email checks
    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    } else if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    //Password checks
    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};