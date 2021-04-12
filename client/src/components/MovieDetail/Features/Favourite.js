import React,{useState,useEffect} from 'react'
import axios from 'axios'
const Favourite = (props) => { 
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title||props.movieInfo.name||props.movieInfo.original_name
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
    const [FavoriteNumber, SetFavoriteNumber] = useState(0)
    const [Favorited, SetFavorited] = useState(false)
    const variables = {
        movieId: movieId,
        userFrom: userFrom,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }
    const onClickFavorite = () => {
        if (Favorited) {
            axios.post('/favourites/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        SetFavoriteNumber(FavoriteNumber - 1)
                        SetFavorited(!Favorited)
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                })

        } else {
            axios.post('/favourites/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        SetFavoriteNumber(FavoriteNumber + 1)
                        SetFavorited(!Favorited)
                    } else {
                        alert('Failed to Add To Favorite')
                    }
                })
        }
    }

useEffect(()=>{
    axios.post("/favourites/favouriteNumber",variables)
    .then(response => {
        if (response.data.success) {
            SetFavoriteNumber(response.data.subscribeNumber)
        } else {
            alert('Failed to get Favorite Number')
        }
    })
    axios.post('/favourites/favourited', variables)
    .then(response => {
        if (response.data.success) {
            SetFavorited(response.data.subcribed)
        } else {
            alert('Failed to get Favorite Information')
        }
    })
},[]);
    return (
        <div>
           <button className="banner__button" onClick={onClickFavorite}>{!Favorited ? "Add to Favorite" : "Not Favorite"} {FavoriteNumber}</button> 
        </div>
    )
}

export default Favourite;
