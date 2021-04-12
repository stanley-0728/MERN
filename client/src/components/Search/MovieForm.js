import React,{useState} from 'react'

import {useHistory} from 'react-router'
const MovieForm = () => {
  const [MovieName, SetMovie] = useState("")
const history=useHistory()
    const onSubmit = (e) => {
        e.preventDefault();
        history.push({pathname:'/searchResults',data:{name:MovieName}})
    }
    return (
        <div>
             <form class="d-flex px-1 py-1" onSubmit={(e)=>onSubmit(e)} >
        <input 
        className="form-control me-2"
         type="search"
          placeholder="Search" 
          aria-label="Search"
            name="MovieName"
            value={MovieName}
            onChange={(e) => SetMovie(e.target.value)}
          />
        <button class="btn btn-outline-primary " type="submit">Search</button>
      </form>
        </div>
    )
}

export default MovieForm
