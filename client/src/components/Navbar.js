import React from 'react'
import axios from 'axios'
import {useHistory} from 'react-router'
import MovieForm from './Search/MovieForm';
const Navbar = () => {
  const name=window.localStorage.getItem('Name');
  const history =useHistory()
  const Logout=()=>{
    axios({
      url:"/api/users/logout",
      method:"POST"
    })
    .then(response=>{
        window.localStorage.clear();
      history.push('/login')
    })
    .catch(error=>console.log(error))
  }


  return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark" style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
  <div className="container-fluid box">
    <a className="navbar-brand mx-4" href="/">Hi {name}!</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNav" >
      <ul className="navbar-nav " style={{marginLeft:"auto"}}>
      <li className="nav-item px-2">
          <a className="nav-link active fav" aria-current="page" href="/dashboard">Home</a>
        </li>
        <li className="nav-item px-2">
          <a className="nav-link  fav" aria-current="page" href="/myFavourites">Favourite</a>
        </li>
       <MovieForm/>
      <li className="nav-item py-1 px-2"  >
          <button className="btn btn-outline-primary" onClick={Logout}>Logout</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

    )
}

export default Navbar
