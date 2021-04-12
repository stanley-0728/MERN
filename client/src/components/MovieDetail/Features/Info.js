import React from 'react'
import Poster from './Poster'
const Info = (props) => {
  const genre=props.movieInfo.genres
  const created=props.movieInfo.created_by&&props.movieInfo.created_by
  const seasons=props.movieInfo.seasons&&props.movieInfo.seasons
  if(props.type==="movie")
  {
  return (
    <div className="container mt-5 bg-light">
        <h1 className="lead-5">Movie Details</h1>
   <div className="row p-1">
   <h5>Genres:
        {genre&&genre.map(genres=><span className="px-1 lead">{genres.name}</span>)}
    </h5>
       {props.movieInfo.tagline&&<h5>Tagline:<span className="lead p-1">{props.movieInfo.tagline}</span></h5>}
       <h5>Release Date:<span className="lead p-1">{props.movieInfo.release_date}</span></h5>
       <h5>Budget:<span className="lead p-1">{props.movieInfo.budget}</span></h5>
       <h5>Runtime:<span className="lead p-1">{props.movieInfo.runtime}</span></h5>
    
    <h5>Vote Average:<span className="lead p-1">{props.movieInfo.vote_average}</span></h5>
   </div>
    
    </div>
  )
  }
  else{
      return (
        <div className="container mt-5 bg-light">
        <h1 className="lead-5">Movie Details</h1>
   <div className="row p-1">
   <h5>Created By:
   {created&&created.map(create=><span className="px-1 lead">{create.name}</span>)}
   </h5>
   <h5>Genres:
        {genre&&genre.map(genres=><span className="px-1 lead">{genres.name}</span>)}
    </h5>
       {props.movieInfo.tagline&&<h5>Tagline:<span className="lead p-1">{props.movieInfo.tagline}</span></h5>}
       <h5>Release Date:<span className="lead p-1">{props.movieInfo.release_date}</span></h5>
        <h5>Number of episodes:<span className="lead p-1">{props.movieInfo.number_of_episodes}</span></h5>
    <h5>Vote Average:<span className="lead p-1">{props.movieInfo.vote_average}</span></h5>

    <div className="container">
        <h5>Seasons:</h5>
        {seasons&&seasons.map(genres=>genres.poster_path&&<Poster poster={genres}/>)}

    </div>

   </div>
    
    </div>
      )
  }
}

export default Info
