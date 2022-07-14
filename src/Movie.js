import React, {useState, useEffect} from "react";
import './index.css';
import App from "./App";
import Search from "./Search";
import axios from "axios";


const Movie = (props) => {
    const movieID = props.imdbID;
    const[movie, setMovie] = useState([]);
    const[isLoading, setIsLoading] = useState(false);
    const api = "http://www.omdbapi.com/?apikey=a619790";
    useEffect(() => {
        axios.get(`${api}&i=${movieID}&Plot=full`)
        .then(res => {
            setMovie(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
    , [])

    const showDetails = () => {
        setIsLoading(true);
    }

    return(
        <div className="">
            {movie.Poster && <img src={`${movie.Poster}`} alt="poster" className=""/>}
            {movie.Title && <h1 className="text-white font-bold text-center py-4 text-2xl">{movie.Title}</h1>}
            <div id="details" className="">
            {movie.Year && <h2 className="text-white">{movie.Year}</h2>}
            <button className="text-white bg-gradient-to-r from-pink-600 to-purple-600" onClick={showDetails}>Details</button>
            {movie.Plot && <p className="text-white ">{movie.Plot}</p>}
            {movie.Actors && <p className="text-white "><strong>Starring: </strong>{movie.Actors}</p>}
            {movie.Director && <p className="text-white "><strong>Directed By: </strong>{movie.Director}</p>}
            {movie.Writer && <p className="text-white "><strong>Written By: </strong>{movie.Writer}</p>}
            {movie.Awards && <p className="text-white "><strong>Awards: </strong>{movie.Awards}</p>}
            {movie.Production && <p className="text-white "><strong>Production: </strong>{movie.Production}</p>}
            {movie.BoxOffice && <p className="text-white "><strong>Box Office: </strong>{movie.BoxOffice}</p>}
            {movie.imdbRating && <p className="text-white "><strong>Imbdb Rading: </strong>{movie.imdbRating}</p>}
            {movie.imdbVotes && <p className="text-white "><strong>Imdb Votes: </strong>{movie.imdbVotes}</p>}
            {movie.Type && <p className="text-white "><strong>Media Type: </strong>{movie.Type}</p>}
            {movie.Website && <p className="text-white "><strong>Website: </strong>{movie.Website}</p>}
            </div>
        </div>
    )
}

export default Movie;