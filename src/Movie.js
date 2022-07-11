import React, {useState, useEffect} from "react";
import './index.css';
import App from "./App";
import Search from "./Search";
import axios from "axios";


const Movie = (props) => {
    const movieID = props.imdbID;
    const[movie, setMovie] = useState([]);
    useEffect(() => {
        axios.get(`http://www.omdbapi.com/?apikey=a619790&i=${movieID}&Plot=full`)
        .then(res => {
            setMovie(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
    , [])

    return(
        console.log(movie),
        <div className="w-screen h-screen rounded shadow-lg bg-black justify-center">
            <div className="container mx-auto">
            {movie.Poster && <img src={`${movie.Poster}`} alt="poster" className="w-1/4 h=1/3 mx-auto"/>}
            {movie.Title && <h1 className="text-white text-center">{movie.Title}</h1>}
            {movie.Year && <h2 className="text-white text-center">{movie.Year}</h2>}
            {movie.Plot && <p className="text-white text-center">{movie.Plot}</p>}
            {movie.Actors && <p className="text-white text-center">{movie.Actors}</p>}
            {movie.Director && <p className="text-white text-center">{movie.Director}</p>}
            {movie.Writer && <p className="text-white text-center">{movie.Writer}</p>}
            {movie.Awards && <p className="text-white text-center">{movie.Awards}</p>}
            {movie.Production && <p className="text-white text-center">{movie.Production}</p>}
            {movie.BoxOffice && <p className="text-white text-center">{movie.BoxOffice}</p>}
            {movie.imdbRating && <p className="text-white text-center">{movie.imdbRating}</p>}
            {movie.imdbVotes && <p className="text-white text-center">{movie.imdbVotes}</p>}
            {movie.imdbID && <p className="text-white text-center">{movie.imdbID}</p>}
            {movie.Type && <p className="text-white text-center">{movie.Type}</p>}
            {movie.Production && <p className="text-white text-center">{movie.Production}</p>}
            {movie.Website && <p className="text-white text-center">{movie.Website}</p>}
            </div>
        </div>
    )
}

export default Movie;