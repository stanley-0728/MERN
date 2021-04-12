import React from 'react'

const MainImage=(props) =>{
    return (
        <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${props.image})`, //optional chaining: no need to check if movie is undefined '?' saw this neat trick on stackoverflow
          
          backgroundRepeat:"no-repeat"
          
        }}
      >
        <div className="banner__contents">
        <h1 className="banner__title">
          {props.title}
        </h1>
       
        <p className="banner__description">{props.text}</p>
      </div>
        <div className="banner--fadeBottom" />
      </header>
    )
}

export default MainImage;