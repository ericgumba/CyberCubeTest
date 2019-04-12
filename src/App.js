import React, { Component } from 'react'; 
import './App.css';  
import Movies from './Components/Movies';
import Character from './Components/Character'

class App extends Component {

  constructor(){
    super()
    this.state = {
      isDisplayingMovie: true,
      movies: [],
      moviesIndex: 0,
      moviesLoaded: false, 
      characterName: "loading character...",
      characterSpecies: "loading species...",
      charactersIndex: 0,
      characterLoaded: false
      
    };
  }

  componentDidMount() {

    fetch('https://swapi.co/api/films/').then(results => {
      return results.json();
    }).then(data => {
      let movies = data.results;

      this.setState({movies:movies, moviesLoaded:true}) 
    });

  }

  fetchSpecies(url){ 
    fetch(url).then(results => {
      return results.json();
    }).then(data => {
      let name = data.name;
      this.setState({characterSpecies:name, characterLoaded:true}); 
    });
  } 
  fetchCharacter() { 
    fetch(this.state.movies[this.state.moviesIndex].characters[this.state.charactersIndex]).then(results => {
      return results.json();
    }).then(data => {
      let name = data.name;
      this.fetchSpecies(data.species[0]);
      this.setState({characterName:name}); 
    });
  }

  displayCharacters() {
    this.fetchCharacter(); 
    this.setState({isDisplayingMovie: false})
  }

  decrementMoviesIndex(){
    if ( this.state.moviesIndex !== 0 ){
      this.setState({moviesIndex: this.state.moviesIndex - 1});
    }
  }
  decrementCharactersIndex(){
    if ( this.state.charactersIndex !== 0 ){ 
      this.setState({charactersIndex: this.state.charactersIndex - 1, characterLoaded: false}); 
    } 
    this.displayCharacters()
  }

  incrementCharactersIndex(){
    if ( this.state.charactersIndex !== this.state.movies[this.state.moviesIndex].characters.length-1 ){ 
      this.setState({charactersIndex: this.state.charactersIndex + 1, characterLoaded: false}); 
      this.displayCharacters()
    } 
  }

  incrementMoviesIndex(){
    if (this.state.moviesIndex !== this.state.movies.length-1){
      this.setState({moviesIndex: this.state.moviesIndex + 1}); 
    } 
  } 

  displayMovies(){
    this.setState({ isDisplayingMovie:true, characterLoaded:false, charactersIndex: 0 });
  }

  renderMovies(){
    return this.state.moviesLoaded ?  
    <Movies decrementMoviesIndex={() => this.decrementMoviesIndex()} 
    title={this.state.movies[this.state.moviesIndex].title} 
    displayCharacters={() => this.displayCharacters()} 
    incrementMoviesIndex={() => this.incrementMoviesIndex()}/>
    : "...LOADING MOVIES"; 
  }

  renderCharacter(){ 
    return this.state.characterLoaded ?  
    <Character decrementCharactersIndex={() => this.decrementCharactersIndex()} 
    displayMovies={() => this.displayMovies()}
    name={this.state.characterName}
    species={this.state.characterSpecies}
    incrementCharactersIndex={() => this.incrementCharactersIndex()}/>
    : "...LOADING CHARACTER";

  }

  renderMoviesOrCharacter(){ 
    if(this.state.isDisplayingMovie){
      return this.renderMovies()
    } else {
      return this.renderCharacter()
    }
  }

  render() { 

    const html = this.renderMoviesOrCharacter();

    return (
      <div className="App"> 
        {html}
      </div>
    );
  }
}

export default App;
