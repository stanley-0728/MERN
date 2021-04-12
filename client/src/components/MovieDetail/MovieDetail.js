import React ,{useState,useEffect}from 'react'
import axios from 'axios';
import MainImage from '../Landing/MainImage'
import {API_KEY,API_URL,IMAGE_BASE_URL,IMAGE_SIZE} from '../Config'
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import MovieCards from '../Landing/MovieCards'
import Navbar from '../Navbar';
import Favourite from './Features/Favourite'
import Comment from './Features/Comment'
import Info from './Features/Info';
const MovieDeatil = (props) => {
    const [Movie,SetMovie]=useState([])
    const [Casts, setCasts] = useState([])
    const [CommentLists, setCommentLists] = useState([])

    const [Actors, setToggle] = useState(false)
    const [trailerUrl, setTrailerUrl] = useState("");
    const movieId =props.match.params.movieId;
    const movie =props.match.params.type||"movie";
    const movieVariable = {
      movieId: movieId
  }

useEffect(()=>{
axios({
url:`${API_URL}${movie}/${movieId}?api_key=${API_KEY}&language=en-US`,
method:"GET"
}).then(response=>{
    SetMovie(response.data)
    let endpointForCasts = `${API_URL}${movie}/${movieId}/credits?api_key=${API_KEY}`;
    axios({
      url:endpointForCasts,
      method:"GET"
    })
    .then(result=>{
      setCasts(result.data.cast)
    })
}).catch(error=>{
  console.log(error)
})

axios.post('/api/comment/getComments', movieVariable)
.then(response => {
    if (response.data.success) {
        setCommentLists(response.data.comments)
    } else {
        alert('Failed to get comments Info')
    }
})
},[]);
const toggleActorView = () => {
  setToggle(!Actors)
}
const movieClicked = (movieName) => {
  if (trailerUrl !=="") setTrailerUrl("");
  else {
    movieTrailer(movieName)
      .then((url) => {
        const urlParamV = new URLSearchParams(new URL(url).search);
       setTrailerUrl(urlParamV.get("v"));
      })
      .catch((err) => console.log(err));
  }
};const youtubeOpts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment))
}
    return (
      <div>
        <Navbar/>
        <div  style={{width:"100%",margin:"0",paddingTop:"0.4px"}}>
            {Movie &&
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                    title={Movie.original_title||Movie.original_name}
                    text={Movie.overview}
                />
            }
            <div className="container mt-3 d-flex flex-row  justify-content-between">
                <button className="banner__button "  onClick={()=>movieClicked(Movie.name || Movie.title || Movie.orginal_name)}>Watch Trailer</button>
                <Favourite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
            </div>              
            { trailerUrl !== "" && <div className="mt-2  "><YouTube videoId={trailerUrl} opts={youtubeOpts} /></div>}
            <Info movieInfo={Movie} type={movie}/>
            <div style={{display:"flex",justifyContent:"center"}} className="mt-3">
                    <button className="banner__button"onClick={toggleActorView} >Toggle Actors</button>
                </div>  
{Actors &&  <div className="container mt-5">
                <div className="row">
                    {
                        Casts && Casts.map((cast) => (
                          cast.profile_path &&
                                <MovieCards
                                actor image={cast.profile_path} characterName={cast.characterName}
                                />
                        ))
                    }
                </div>
                
            </div>
            }
              
            <div className="container mt-5"><Comment movieTitle={Movie.name || Movie.title || Movie.orginal_name} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} /></div> 

     </div>   
     </div>

    )
    }

export default MovieDeatil;
