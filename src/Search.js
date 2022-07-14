import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    const[pageNumber, setPageNumber] = useState(1);
    const[hasMore, setHasMore] = useState(false);
    const[movie, setMovie] = useState([]);
    const[query, setQuery] = useState('');
    const api = "http://www.omdbapi.com/?apikey=a619790";
    const img = "http://img.omdbapi.com/?apikey=a619790";


    const observer = useRef();
    const lastMovieElementRef = useCallback(node => {
      if(isLoading) return
      if(observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersection) {
          console.log('visible')
        }
      }, [isLoading, hasMore])
      if(node) observer.current.observe(node)
    })

    const onChangeTitle = (e) => {
      setTitle(e.target.value);
      setPageNumber(1);
    }
    
    const search = () => {
      axios.get(`${api}&s=${title}&page=${pageNumber}`)
        .then(res => {
          setContainer(res.data)
          setHasMore(res.data.Search.length > 0)
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
      }
    
    useEffect(() => {
      setIsLoading(true);
      search()
    }, [finalPoint, pageNumber])
  
    const onSubmitHandler = (e) => {
      e.preventDefault();
      setFinalPoint(title);
    }

    
    
    return (
       <div className="">
          <div className="grid gap-8 items-start justify-center"></div>
            <h1 className='text-white mx-auto font-extrabold text-5xl'>MovieDeets</h1>
            <div className="relative group">
              <div className="absolute 
                      -inset-0.5 
                      bg-gradient-to-r 
                      from-pink-600 
                      to-purple-600 
                      rounded-lg 
                      blur 
                      opacity-75 
                      group-hover:opacity-100 
                      transition 
                      duration-1000 
                      group-hover:duration-200
                      animate-tilt
                      "
              >
              </div>
              <button type="submit" className="px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-400 relative " onClick={onSubmitHandler}>
                <span className="pl-6 text-gray-600">
                <input type="text" value={title} onChange={onChangeTitle} placeholder="Get the MovieDeets" className="p-1 rounded-md" />
                </span>
                <span className="pl-6 text-indigo-400">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              </button>
            </div>
        {container.Search && container.Search.map((item, index) => {
          if(container.length === index + 1)
            return <Movie key={index} ref={lastMovieElementRef} imdbID={item.imdbID} />
          else{
          return(
            <div key={item.imdbID} className="overflow-hidden">
              <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                <div className="flex flex-wrap -m-1 md:-m-2">
                  <div className="flex flex-wrap w-1/3">
                    <div className="w-full p-1 md:p-2">
                      <div className='block object-cover object-center w-full h-full'>
                        <Movie imdbID={item.imdbID} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
          }
        })}
        {container.Search && <div className='text-white text-center font-bold pb-5 -pt-16 bg-black'>Displaying {container.Search.length} of {container.totalResults} results</div>}
      </div>
    )


}

export default Search;