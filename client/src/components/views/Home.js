import React,{useEffect} from 'react';
import{ motion} from 'framer-motion'
const content={
  hidden:{
    opacity:0,
  },
  visible:{
    opacity:1,
  },
  transition:{
    type :'tween',
    delay:2,
    duration:5,
    ease:"easeInOut"

  }
}

const Home = ({history}) => {
  useEffect(()=>{
    if(localStorage.getItem('isAuthenicated'))
    {
        history.push('/dashboard');
    }
},[history]);
    return (
        <div  className="landing-div">
        <nav className="navbar navbar-expand-lg navbar-dark bg-sucess ">
  <div   className="container-fluid box">
    <a className="navbar-brand mx-4" href="/">Movies</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNav" >
      <ul className="navbar-nav px-1  "style={{marginLeft:"auto"}}>
        <li className="nav-item ">
          <a className="nav-link active" aria-current="page" href="/login">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="/register">Register</a>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
<div className="landing-wrapper d-flex flex-column h-100 align-items-center justify-content-center text-center">
<motion.h1
variants={content}
initial="hidden"
animate="visible"
>Welcome To The World Of Movies </motion.h1>
</div>
</div>
    )
}

export default Home;
