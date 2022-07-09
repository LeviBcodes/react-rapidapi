import React, { useState, useEffect } from 'react';
import './index.css';
import { Link, Routes, Route, Switch, BrowserRouter } from 'react-router-dom';
import Movie from './Movie';
import Search from './Search';

function App() {
  

  return (
    <Search />
    // <BrowserRouter>
    //   <Routes>
    //     <Route exact path="/" element={<Search />}/>
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App;
