import React from 'react'

const MovieList = (props) => {
  const Favouritecomponent = props.favouritecomponent;
  return (
    <>
      {props.movies.map((movies,index)=>(
        <div className='image-container d-flex justify-content-start m-3'>
            <img src={movies.Poster} alt="movie" />
            <div onClick={()=>props.handleFavouriteClick(movies)} className="overlay d-flex align-items-center justify-content-center">
              <Favouritecomponent/>
            </div>
        </div>
        
      ))}
    </>
  )
}

export default MovieList
