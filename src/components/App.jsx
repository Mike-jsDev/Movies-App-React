import React from 'react';
import './App.css';
import { moviesData } from "../constance/moviesData.js";
import MovieItem from "./MovieItem";




class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: moviesData
    };
  }


  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(function(item) {
      return item.id !== movie.id
    })
    console.log(updateMovies)
    this.setState({
      movies: updateMovies
    })
  }



  render() {
    console.log("render", this.state, this)
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
          {this.state.movies.map(movie => {
           return <MovieItem key={movie.id} movie={movie} removeMovie={this.removeMovie} />;
         })}
          </div>
          <div className="col-3">
            <p>Will watch: 0</p>
          </div>
        </div>
      </div>
    )
  } 
}


// function App() {
//   return (
//     <div className="App">
//       <h1>
//         {moviesData[2].title}
//       </h1>
//     </div>
//   );
// }

export default App;
