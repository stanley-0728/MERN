import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Classnames from 'classnames';
import {motion} from 'framer-motion'
const content={
    hidden:{
      opacity:0,
      x:"250vw"
    },
    visible:{
      opacity:1,
      x:"0"
    },
    transition:{
      type :'spring',
      damping: 10,
  stiffness: 50
    },
  }
const Login = ({history}) => {
    useEffect(()=>{
        if(localStorage.getItem('isAuthenicated'))
        {
            history.push('/dashboard');
        }
    },[history]);
    const [loginData, SetLoginData] = useState({
        username:"",
        email: "",
        password: "",
        errors:{}
      });
    
      const onChange = (e) =>
      {
        const name= e.target.name;
        const value=e.target.value;
        SetLoginData({...loginData,[name]:value});
      };
    const onSubmit = (e) => {
        e.preventDefault();
        SetLoginData({errors:{}})
        axios({
            url:"/api/users/signin",
            method:"POST",
            data:{
                username:loginData.username,
                email:loginData.email,
                password:loginData.password
            }
        })
        .then(response=>
            {
                window.localStorage.setItem("userId",response.data._id)
                const isAuthenicated=response.data.isAuthenicated;
                window.localStorage.setItem('isAuthenicated',isAuthenicated);
                window.localStorage.setItem('Name',loginData.username)
                history.push('/dashboard');
            })
        .catch(error=>{
            const message=error.response.data
            SetLoginData({...loginData,errors:message})
        })

      };
       
    return (
        <div className="d-flex align-items-center light-blue-gradient" >
            <motion.div
            variants={content}
            initial="hidden"
            animate="visible"
            className="container" >
                <div className="d-flex justify-content-center">
                    <div className="col-md-6">
                        <div className="card rounded-0 shadow">
                            <div className="card-body">
                                {loginData.errors.message&&<div className="card-title">{loginData.errors.message}</div>}
                                <form onSubmit={(e)=>onSubmit(e)} >
                                <div className="form-group p-1">
                                        <label >Username</label>
                                        <input 
                                        type="text" className={Classnames('form-control',{'has-error':loginData.errors.username})} 
                                        id="exampleInputUserName"
                                        name="username"
                                        placeholder="Username"

                                        value={loginData.username || ''}   
                                        onChange={(e) => onChange(e)}
                                        />
                                      {loginData.errors.username&& <span className="help-box red-text">{loginData.errors.username}</span>}
                                    </div>
                                    <div className="form-group p-1">
                                        <label >Email address</label>
                                        <input 
                                        type="email" 
                                        className={Classnames('form-control',{'has-error':loginData.errors.email})}
                                         id="exampleInputEmail1"
                                          aria-describedby="emailHelp" 
                                          placeholder="Enter email"
                                          name="email"
                                          value={loginData.email|| ''}   
                                          onChange={(e) => onChange(e)}
                                          />
                                       {loginData.errors.email&& <span className="help-box red-text">{loginData.errors.email}</span>}
                                    </div>
                                    <div className="form-group p-1">
                                        <label >Password</label>
                                        <input type="password"
                                        className={Classnames('form-control ',{'has-error':loginData.errors.password })}
                                         id="exampleInputPassword1"
                                          placeholder="Password"
                                          name="password"
                                          value={loginData.password || ''}
                                          onChange={(e)=>onChange(e)}
                                          />
                                 {loginData.errors.password&& <span className="help-box red-text">{loginData.errors.password}</span>}
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
                                    <div className="mt-2 " >
                                        <h5>Don't Have an account  <Link to="/register" className="txt-primary"><span> Sign Up</span></Link></h5>
                                       
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

export default Login;
