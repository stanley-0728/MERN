import React ,{useState,useEffect}from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Classnames from 'classnames';
import {motion} from 'framer-motion'
const content={
    hidden:{
      opacity:0,
      x:"400vw"
    },
    visible:{
      opacity:1,
      x:"0"
    },
    transition:{
      type :'spring',
      delay:0.5,
      duration:1,
      stiffness:30
    },
  }
const  Register=({history})=> {
    useEffect(()=>{
        if(localStorage.getItem('isAuthenicated'))
        {
            history.push('/dashboard');
        }
    },[history]);
    const [SignupData, SetSignupData] = useState({
        username:"",
        email: "",
        password: "",
        password1:"",
        errors:{}
      });

      const onChange = (e) =>
      {
        const name= e.target.name;
        const value=e.target.value;
        SetSignupData({...SignupData,[name]:value});
      };
    const onSubmit = (e) => {
        e.preventDefault();
        SetSignupData({errors:{}})
        axios({
            url:"/api/users/signup",
            method:"POST",
            data:{
                username:SignupData.username,
                email:SignupData.email,
                password:SignupData.password,
                password1:SignupData.password1
            }
        })
        .then(response=>
            {
                return history.push('/login');

            })
        .catch(error=>{
            const message=error.response.data
            SetSignupData({...SignupData,errors:message})
        })

      };
    return (
        <div 
        className="d-flex align-items-center light-blue-gradient" >
        <motion.div
        variants={content}
        initial="hidden"
        animate="visible"
        className="container" >
            <div className="d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card rounded-0 shadow">
                        <div className="card-body">
                            {SignupData.errors.message&&<div className="card-title">{SignupData.errors.message}</div>}
                            <form onSubmit={(e)=>onSubmit(e)} >
                            <div className="form-group p-1">
                                    <label>Username</label>
                                    <input 
                                    type="text" className={Classnames('form-control',{'has-error':SignupData.errors.username})} 
                                    id="exampleInputUserName"
                                    name="username"
                                    placeholder="Username"

                                    value={SignupData.username || ''}   
                                    onChange={(e) => onChange(e)}
                                    />
                                  {SignupData.errors.username&& <span className="help-box red-text">{SignupData.errors.username}</span>}
                                </div>
                                <div className="form-group p-1">
                                    <label >Email address</label>
                                    <input 
                                    type="email" 
                                    className={Classnames('form-control',{'has-error':SignupData.errors.email})}
                                     id="exampleInputEmail1"
                                      aria-describedby="emailHelp" 
                                      placeholder="Enter email"
                                      name="email"
                                      value={SignupData.email|| ''}   
                                      onChange={(e) => onChange(e)}
                                      />
                                   {SignupData.errors.email&& <span className="help-box red-text">{SignupData.errors.email}</span>}
                                </div>
                                <div className="form-group p-1">
                                    <label >Password</label>
                                    <input type="password"
                                    className={Classnames('form-control ',{'has-error':SignupData.errors.password })}
                                     id="exampleInputPassword1"
                                      placeholder="Password"
                                      name="password"
                                      value={SignupData.password|| ''}
                                      onChange={(e)=>onChange(e)}
                                      />
                             {SignupData.errors.password&& <span className="help-box red-text">{SignupData.errors.password}</span>}
                                </div>
                                <div className="form-group p-1">
                                    <label >Confirm Password</label>
                                    <input type="password"
                                    className={Classnames('form-control ',{'has-error':SignupData.errors.password1 })}
                                     id="exampleInputPassword1"
                                      placeholder="Confirm Password"
                                      name="password1"
                                      value={SignupData.password1 || ''}
                                      onChange={(e)=>onChange(e)}
                                      />
                             {SignupData.errors.password1&& <span className="help-box red-text">{SignupData.errors.password1}</span>}
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
                                <div className="mt-2 " >
                                    <h5>Have an account  <Link to="/login" className="txt-primary"><span> Log In</span></Link></h5>
                                   
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            </motion.div>
            </div>
    )
}

export default Register;
