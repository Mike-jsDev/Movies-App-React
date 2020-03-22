import React from 'react';
// import { moviesData } from "../data/moviesData.js";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api.js";
import MovieTabs from "./MovieTabs";




class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "revenue.desc"
    };

    // console.log("constructor")
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("didUpdate")
    // console.log("prev", prevProps, prevState)
    // console.log("this", this.props, this.state)
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`).then((response) => {
      // console.log("then")
      return response.json()
    }).then((data) => {
      // console.log("data", data)
      this.setState({
        movies: data.results
      })
    })
  }

  removeMovie = movie => {
    // console.log(movie.id)
    const updateMovies = this.state.movies.filter(item =>
      item.id !== movie.id)
    // console.log(updateMovies)
    this.setState({
      movies: updateMovies
    })
  }


  addMovieToWillWatch = movie => {
    // console.log(movie)
    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie]

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    })
  }
  
  removeMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function(item) {
      return item.id !== movie.id
    })
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    })
  }


  updateSortBy = value => {
    this.setState({
      sort_by: value
    })
  }


  render() {
    console.log("render", this.state.sort_by)
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs 
                   sort_by={this.state.sort_by}
                   updateSortBy={this.updateSortBy}
                   />
              </div>
            </div>
            <div className="row">
            {this.state.movies.map(movie => {
             return (
               <div className="col-6 mb-4" key={movie.id}>
                 <MovieItem 
                  data={movie} 
                  removeMovie={this.removeMovie} 
                  addMovieToWillWatch={this.addMovieToWillWatch}
                  removeMovieFromWillWatch={this.removeMovieFromWillWatch}/>;
               </div>
              )
            })}
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  } 
}


export default App;
