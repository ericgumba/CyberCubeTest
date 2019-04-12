import React from 'react'
import MovieCard from './MovieCard';

function Movies(props){
    const { decrementMoviesIndex, title, displayCharacters, incrementMoviesIndex } = props; 
  
    return (
        <div> 
          <button onClick={() => decrementMoviesIndex()}> Previous </button>   
          <MovieCard title={title} displayCharacters={() => displayCharacters()}/> 
          <button onClick={() => incrementMoviesIndex()}> Next </button>
        </div>
    );

}

export default Movies