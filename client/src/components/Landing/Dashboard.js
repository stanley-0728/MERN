import React,{useState,useEffect} from 'react'
import MainImage from './MainImage'
import MovieCards from './MovieCards'
import {API_KEY,API_URL,IMAGE_BASE_URL,IMAGE_SIZE,POSTER_SIZE} from '../Config'
import Navbar from '../Navbar'
const Dashboard = (props) => {
    
    const [Movies, SetMovies] = useState([])
    const [MainMovieImage, SetMainMovieImage] = useState(null)
  const [Loading, SetLoading] = useState(true)
  const [CurrentPage, SetCurrentPage] = useState(0)
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
   
    fetchMovies(endpoint)
    //eslint-disable-next-line
}, []);
const fetchMovies = (endpoint) => {

    fetch(endpoint)
        .then(result => result.json())
        .then(result => {
        //console.log('Movies',...Movies)
             SetMovies([...Movies, ...result.results])
                SetMainMovieImage(MainMovieImage || result.results[Math.floor(Math.random() * result.results.length)])
            SetCurrentPage(result.page)
        }, SetLoading(false))
        .catch(error => console.error('Error:', error)
        )
}
const loadMoreItems = () => {
    let endpoint = '';
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
    fetchMovies(endpoint);

}
    return (
        <div>
            <Navbar/>
        <div className="container-fluid px-0 " style={{margin:"0",paddingTop:"0.4px"}}>
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />

            }
            <div className="container mt-3">
                <h1 style={{color:"#fff"}}>Latest Movies</h1>
                <hr />
                <div className="row">
                    {
                        Movies && Movies.map((movie) => (
                                <MovieCards
                                    image={movie.poster_path ?
                                        `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                        : null}
                                    movieId={movie.id}
                                    movieName={movie.original_title||movie.orginal_name}
                                    movie="movie"
                                />
                        ))
                    }
                </div>
            </div>
            {Loading &&
                    <div>Loading...</div>}

                <br />
                <div style={{display:"flex",justifyContent:"center"}}>
                    <button className="btn btn-primary" onClick={loadMoreItems}>Load More</button>
                </div>
            </div>
            </div>

           
    )
}

export default Dashboard;
