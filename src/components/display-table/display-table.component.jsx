import {useEffect, useState} from 'react';
import './display-table.styles.css';

const DisplayTable = ({planets}) => {

  const [display, setDisplay] = useState(planets)
  
  useEffect(() => {
    const sortedPlanets = planets.sort((a, b) => (a.name > b.name) ? 1 : -1);
    setDisplay(sortedPlanets)
  },[planets])

  const renderedDisplay = display.map((planet, i) => {
    return(
      <div key={i} className='wrapper'>
        <span className='one'>{planet.name}</span>
        <span className='two'>{planet.population}</span>
        <span className='three'>{planet.rotation_period}</span>
        <span className='four'>{planet.orbital_period}</span>
        <span className='five'>{planet.diameter}</span>
        <span className='six'>{planet.climate}</span>
        <span className='seven'>{planet.surface_water}</span>
      </div>
    )
  })

  return (
    <div>
      <div className='wrapper-header'>
        <span className='one'>Planet</span>
        <span className='two'>Population</span>
        <span className='three'>Rotation Period</span>
        <span className='four'>Orbital Period</span>
        <span className='five'>Diameter</span>
        <span className='six'>Climate</span>
        <span className='seven'>Surface Water</span>
        </div>
      {renderedDisplay}
    </div>
  )
}

export default DisplayTable