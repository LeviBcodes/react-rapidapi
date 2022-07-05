import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const[country, setCountry] = useState('');
  const[service, setService] = useState('');
  const[type, setType] = useState('');
  const[genre, setGenre] = useState('');
  const[outputLanguage, setOutputLanguage] = useState('');
  const[language, setLanguage] = useState('');
  const[page, setPage] = useState(1);

  const genres = {
    "1":"Biography",
    "3":"Game Show",
    "2":"Film Noir",
    "4":"Musical",
    "5":"Sport",
    "6":"Short",
    "7":"Adult",
    "12":"Adventure",
    "14":"Fantasy",
    "16":"Animation",
    "18":"Drama",
    "27":"Horror",
    "28":"Action",
    "35":"Comedy",
    "36":"History",
    "37":"Western",
    "53":"Thriller",
    "80":"Crime",
    "99":"Documentary",
    "878":"Science Fiction",
    "9648":"Mystery",
    "10402":"Music",
    "10749":"Romance",
    "10751":"Family",
    "10752":"War",
    "10763":"News",
    "10764":"Reality",
    "10767":"Talk Show",
  };

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0f29cad798msh47149466314dbd6p13b13cjsne4a16cf5edc8',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }

  }
  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  }

  const onChangeService = (e) => {
    setService(e.target.value);
  }
  const onChangeType = (e) => {
    setType(e.target.value);
  }

  const onChangeGenre = (e) => {
    setGenre(e.target.value);
  }
  const onChangeOutputLanguage = (e) => {
    setOutputLanguage(e.target.value);
  }

  const onChangeLanguage = (e) => {
    setLanguage(e.target.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
  
    fetch(`https://streaming-availability.p.rapidapi.com/search/basic?country=${country}&service=${service}&type=${type}&genre=${genre}&outpult_language=${outputLanguage}&language=${language}`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  return (
    <div className="App">
      <form action="">
        <input type="text" value={country} onChange={onChangeCountry} />
        <input type="text" value={service} onChange={onChangeService} />
        <input type="text" value={type} onChange={onChangeType} />
        <select value={genre} onChange={onChangeGenre}>
          {Object.values(genres).map((genre, index)=> {
            return <option key={index} value={genre}>{genre}</option>
          })}
        </select>
        <select value={outputLanguage} onChange={onChangeOutputLanguage}>
          <option value="">Select</option>
          <option value="en">en</option>
          <option value="es">es</option>
        </select>
        <input type="text" value={language} onChange={onChangeLanguage} />
        <button type="submit" onClick={onSubmitHandler}>Submit</button>
      </form>
    </div>
  );
}

export default App;
