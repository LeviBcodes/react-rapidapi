import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const[t, setTitle] = useState('');
  const[container, setContainer] = useState([]);
  const[finalPoint, setFinalPoint] = useState('');

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  
  const fetchMe = () => {
    fetch(`http://www.omdbapi.com/?apikey=e76c98b5&s=${t}`)
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
    <div className="App">
      <form action="">
        <input type="text" value={t} onChange={onChangeTitle} />
        <button type="submit" onClick={onSubmitHandler}>Submit</button>
      </form>
      {container.Search && container.Search.map((item, index) => {
        return(
          <div key={index}>
            {item.Title}
            <img src={item.Poster} alt="" />
          </div>
        )
      })}
      <div>showing {container.Search && container.Search.length} of {container.totalResults} results</div>
    </div>
  )
}

export default App;
