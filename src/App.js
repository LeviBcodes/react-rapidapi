import React, { useState, useEffect } from 'react';
import './index.css';
import { Link, Routes, Route, Switch, BrowserRouter } from 'react-router-dom';
import Movie from './Movie';
import Search from './Search';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Search />}/>
        <Route exact path="/movie/:id" element={<Movie />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
