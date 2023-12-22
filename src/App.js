import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieList from './component/MovieList'
import MovieHeading from './component/MovieHeading'
import SearchBox from './component/SearchBox'
import AddFavourites from './component/AddFavourites'
import RemoveFavourites from './component/RemoveFavourites'
 
const App = () => {
  const [movies,setMovies] = useState([])
  const [favourites,setFavourites] = useState([])
  const [searchValue,setSearchValue] = useState('')

  const getMovieRequest = async(searchValue) =>{
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=852c3a14`

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  }

  useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue])

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, [])

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	}

  const addFavouriteMovie = (movies) => {
    const newFavouriteList = [...favourites,movies];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }
  const removeFavouriteMovie = (movies) =>{
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID!==movies.imdbID
    )
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className="row d-flex align-items-center pt-2 pb-2 heading">
        <MovieHeading heading="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList 
          movies={movies}
          handleFavouriteClick={addFavouriteMovie} 
          favouritecomponent={AddFavourites}
        />
      </div>
      <div className="row d-flex align-items-center pt-2 pb-2 heading">
        <MovieHeading heading="Favourites"/>
      </div>
       <div className='row'>
        <MovieList 
          movies={favourites}
          handleFavouriteClick={removeFavouriteMovie} 
          favouritecomponent={RemoveFavourites}
        />
      </div>
    </div>
  )
}

export default App;
