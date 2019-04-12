import React from 'react'
import CharactersCard from './CharactersCard';

function Character(props){
    const { decrementCharactersIndex, name, species, incrementCharactersIndex, displayMovies } = props; 
  
    return (
        <div>
          <button onClick={() => displayMovies()}> Back Button </button>
          <button onClick={() => decrementCharactersIndex()}>Previous </button>
          <CharactersCard name={name} species={species}/>
          <button onClick={() => incrementCharactersIndex()}> Next </button> 
        </div>
    );

}

export default Character