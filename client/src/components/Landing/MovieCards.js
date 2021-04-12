import React from 'react'
import { IMAGE_BASE_URL,POSTER_SIZE } from '../Config';

const MovieCards = (props) => {
    let { actor, image, movieId, movieName, characterName,movie } = props
    if(actor)
    {
        return (
            <div className="projectCard col-md-6 col-lg-3 my-2">
        <figure className="projectCard_wrapper">
                        <img className="projectCard_image" alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
            </figure>
            </div>         
        )
    }
else {
    return (
        <div  className="projectCard col-md-6 col-lg-3 my-2">
        <figure className="projectCard_wrapper">
        <a href={`/movie/${movieId}/${movie}`} >
                        <img className="projectCard_image" alt={movieName} src={image} />
                    </a>
            </figure>
            </div>
            
    )
}
    
}

export default MovieCards
