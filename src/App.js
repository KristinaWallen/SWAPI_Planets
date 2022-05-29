import {useEffect, useState} from 'react';
import DisplayTable from './components/display-table/display-table.component';
import BarChart from './components/bar-chart/bar-chart.component';
import './App.css';

function App() {
  const [url, setUrl] = useState('https://swapi.dev/api/planets/?page=1');
  const [planets, setPlanets] = useState([]);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    fetch(url)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      setPlanets(data.results);
      setPrevious(data.previous);
      setNext(data.next);
    })
  },[url])

  const handleLessClick = () => {
    setUrl(previous);
  }
  
  const handleMoreClick = () => {
    setUrl(next);
  }

  return (
    <div className="App">
     <h1>Star Wars Planets</h1>
     <DisplayTable planets={planets}/>
     {previous && <button className='display-button' onClick={handleLessClick}>Previous</button>}
     {next && <button className='display-button' onClick={handleMoreClick}>Next</button>}
     <BarChart planets={planets}/>
    </div>
  );
}

export default App;
