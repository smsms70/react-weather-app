import { useState } from "react"
import "../styles/fetch-selection.css"


export function LocationSelection({locationHandler}) {
  return (
    <>
      <select name="City" id="city_selection" onChange={locationHandler}>
        <option value="London">London</option>
        <option value="Paris">Paris</option>
        <option value="Tokyo">Tokyo</option>
        <option value="Caracas">Caracas</option>
        <option value="Venezuela">Puerto Piritu</option>
      </select>
    </>
  )
}

export function ForecastSelection ({forecastHandler, forecastDay}) {
  return (
    <div id="forecast-days-selection-container">
      <span id="forecast-text">Forecast </span>
      <select 
        name="daystoforecast" 
        id="forecast_selection" 
        value={forecastDay} 
        onChange={forecastHandler}
      >
        <option value="1">1 days</option>
        <option value="2">2 days</option>
        <option value="3">3 days</option>
      </select>
    </div>
  )
}

export function LocationsMinSelection (value) {
  return(
    <option value = {value} >{value}</option>
  )
}


export function SearchBar ({setLocation}) {
  const [value, setValue] = useState("");
  const handleSearch = () => {
    if (value) { // Ensure value is not empty
      setLocation(value);
    }
  };
  const handleSearchBar = (e) => setValue(e.target.value);
  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return(
    <nav id="search-bar-container">
      <input 
        type="text" 
        name="" 
        id="search-bar-bar" 
        onChange={handleSearchBar}
        onKeyDown={handleOnKeyDown}
      />
      <button id="search-bar-button" onClick={handleSearch}>
        <img src="../../icons/search.png" alt="" />
      </button>
    </nav>
  )
}