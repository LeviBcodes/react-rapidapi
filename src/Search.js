import React, { useState, useEffect } from 'react';
import './index.css';
import App from "./App";
import Movie from "./Movie";
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import axios from 'axios';

function Search() {
    const[t, setTitle] = useState('');
    const[container, setContainer] = useState([]);
    const[finalPoint, setFinalPoint] = useState('');
    const[movie, setMovie] = useState([]);
    const api = "http://www.omdbapi.com/?apikey=a619790";
    const img = "http://img.omdbapi.com/?apikey=a619790";
  
    const onChangeTitle = (e) => {
      setTitle(e.target.value);
    }
    
    const fetchMe = () => {
      axios.get(`${api}&s=${t}`)
        .then(res => {
          setContainer(res.data);
        })
        .catch(err => {
          console.log(err);
        })
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
            axios.get(`${api}&i=${item.imdbID}`)
            .then(res => {
              setMovie(res.data);
            })
            .then(console.log(movie))
            .catch(err => {
              console.log(err);
            })
            
            let movies = Object.entries(movie).length > 0 && Object.entries(movie).map(([key, value]) => { 
              if(key === "Ratings") {
                return value.map((item, index) => {
                  return item.Source + ": " + item.Value
                })
              }
              if(key === "Poster") {
                return <img src={`${img}&i=${item.imdbID}`} alt="poster" />
              }
              console.log(key, value)
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