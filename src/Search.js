import React, { useState, useEffect } from 'react';
import './index.css';
import App from "./App";
import Movie from "./Movie";
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import axios from 'axios';

function Search() {
    const[title, setTitle] = useState('');
    const[key, setKey] = useState(0);
    const[container, setContainer] = useState([]);
    const[finalPoint, setFinalPoint] = useState('');
    const[isLoading, setIsLoading] = useState(false);
    const[movie, setMovie] = useState([]);
    const api = "http://www.omdbapi.com/?apikey=a619790";
    const img = "http://img.omdbapi.com/?apikey=a619790";
  
    const onChangeTitle = (e) => {
      setTitle(e.target.value);
    }
    
    const search = () => {
      axios.get(`${api}&s=${title}`)
        .then(res => {
          setContainer(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
    
    useEffect(() => {
      search()
    }, [finalPoint])
  
    const onSubmitHandler = (e) => {
      e.preventDefault();
      setFinalPoint(title);
    }

    
    
    return (
        <div className="w-screen h-screen">
        <form action="">
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4" onClick={onSubmitHandler}>
        </button>
          <div className="w-full h-full flex justify-center items-center">
            <input type="text" value={title} onChange={onChangeTitle} placeholder="Get the MovieDeets"
                className="w-96 px-3 py-2 rounded-tl-full rounded-bl-full border-0 focus:outline-0" />
            <button type="submit" className="px-3 py-2 -ml-1.5 bg-green-500 hover:bg-green-600 text-white rounded-tr-full rounded-br-full">Search</button>
          </div>
        </form>
        {container.Search && container.Search.map((item, index) => {
          return(
            <div key={item.imdbID} className="pt-5 h-screen">
              <Movie imdbID={item.imdbID} />
            </div>
          )
        })}
        {container.Search && <div className='text-white text-center'>Displaying {container.Search.length} of {container.totalResults} results</div>}
      </div>
    )

}

export default Search;