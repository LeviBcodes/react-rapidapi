import React, { useState, useEffect } from 'react';
import './index.css';
import App from "./App";
import Movie from "./Movie";
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

function Search() {
    const[t, setTitle] = useState('');
    const[container, setContainer] = useState([]);
    const[finalPoint, setFinalPoint] = useState('');
    const[movie, setMovie] = useState([]);
    const api = "http://www.omdbapi.com/?apikey=a619790";
  
    const onChangeTitle = (e) => {
      setTitle(e.target.value);
    }
    
    const fetchMe = () => {
      fetch(`${api}&s=${t}`)
      .then(response => { return response.json();})
      .then(data => {setContainer(data)})
      .then(console.log(container))
      
      .catch(err => console.error(err));
    }
    
    useEffect(() => {
      fetchMe()
    }, [finalPoint])
  
    const onSubmitHandler = (e) => {
      e.preventDefault();
      setFinalPoint(t);
    }
    return (
        <div className="text-center">
        <form action="">
          <input type="text" value={t} onChange={onChangeTitle} />
          <button type="submit" onClick={onSubmitHandler}>Submit</button>
        </form>
        {container.Search && container.Search.map((item, index) => {
            const fetchMovie = () => {
            fetch(`${api}&t=${item.Title}`)
            .then(response => { return response.json();})
            .then(data => {setMovie(data)})
            .then(console.log(movie))
            .catch(err => console.error(err));

            Object.keys(movie).length > 0 && Object.keys(movie).map((key) => {
                if(key === 'Poster'){
                }
            })
          }
          return(
            <div key={index} className="pt-5">
                <button type="submit" onClick={fetchMovie}>
                    {item.Title}
                    <img src={item.Poster} alt="" />
                    <p>{item.Year}</p>
                </button>
            </div>
          )
        })}
        <div>showing {container.Search && container.Search.length} of {container.totalResults} results</div>
      </div>
    )

}

export default Search;