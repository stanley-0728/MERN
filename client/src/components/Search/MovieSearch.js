import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router'
import MainImage from '../Landing/MainImage'
import MovieCards from '../Landing/MovieCards'
import {IMAGE_BASE_URL,IMAGE_SIZE,POSTER_SIZE} from '../Config'
import Navbar from '../Navbar'

const MovieSearch = (props) => {
    const history=useHistory()
   const Movie=props.location.data &&props.location.data.name
   console.log(Movie)
    if(!Movie)
    history.push('/dashboard')
    const [Movies, SetMovies] = useState([])
    const [MainMovieImage, SetMainMovieImage] = useState(null)

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/search/multi?api_key=d5d383fa16644eddf8ef58f1a2e6d7ce&language=en-US&query=${Movie}&page=1&include_adult=false`;
   
    fetchMovies(endpoint)
    //eslint-disable-next-line
}, [Movie]);
const fetchMovies = (endpoint) => {

    fetch(endpoint)
        .then(result => result.json())
        .then(result => {
             SetMovies(result.results)
                SetMainMovieImage(result.results[0])
        }, )
        .catch(error => console.error('Error:', error)
        )
}

    return (
        <div>
            <Navbar/>
        <div className="container-fluid px-0 " style={{margin:"0",paddingTop:"0.4px"}}>
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title||MainMovieImage.original_name}
                    text={MainMovieImage.overview}
                />

            }
            <div className="container mt-3">
                <h1 style={{color:"#fff"}}>Search Results</h1>
                <hr />
                <div className="row">
                    {
                        Movies && Movies.map((movie) => (
                                <MovieCards
                                    image={movie.poster_path ?
                                        `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                        : null}
                                    movieId={movie.id}
                                    movieName={movie.original_title||movie.original_name}
                                    movie={movie.media_type}
                                />
                        ))
                    }
                </div>
            </div>               
            </div>
            </div>

           
    )
}
export default MovieSearch
