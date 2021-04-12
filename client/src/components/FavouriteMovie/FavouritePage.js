import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Navbar from '../Navbar'

const FavouritePage = () => {
  const [Favourites, setFavourites] = useState([])
  const [Loading, setLoading] = useState(true)
  let variable = { userFrom: localStorage.getItem('userId') }

  useEffect(() => {
      fetchFavoredMovie()
  }, []);
  const fetchFavoredMovie = () => {
    axios.post('/api/favourites/getFavouredMovie', variable)
        .then(response => {
            if (response.data.success) {
                setFavourites(response.data.favourites)
                setLoading(false)
            } else {
                alert('Failed to get subscription videos')
            }
        })
}
const onClickDelete = (movieId, userFrom) => {

  const variables = {
      movieId: movieId,
      userFrom: userFrom,
  }

  axios.post('/api/favourites/removeFromFavorite', variables)
      .then(response => {
          if (response.data.success) {
              fetchFavoredMovie()
          } else {
              alert('Failed to Remove From Favorite')
          }
      })
}

const renderCards = Favourites.map((favorite, index) => {


  return <tr key={index} scope="row">

                <td >{favorite.movieTitle||favorite.name||favorite.orginal_name}</td>

      <td >{favorite.movieRunTime} mins</td>
      <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)} className="banner__button"> Remove </button></td>
  </tr>
})

  return (
    <div>
      <Navbar/>
      <div className="container mt-5 p-5" >
        {!Loading&&
        <table className="table table-dark table-hover">
        <thead>
            <tr>
                <th scope="col" >Movie Title</th>
                <th scope="col" >Movie RunTime</th>
                <td scope="col" style={{color:"white"}} >Remove from favorites</td>
            </tr> 
        </thead>
        <tbody>
            {renderCards}
        </tbody>
    </table>
        
}

      </div>
    </div>
  )
}

export default FavouritePage
