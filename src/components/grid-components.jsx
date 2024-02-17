import { ForecastDay } from "./forecast-days.jsx";
import { ForecastSelection, SearchBar } from "./fetchSelections.jsx";
import { Gc2Main } from "./gc2-components.jsx";
import WorldMap from "react-svg-worldmap";
import "../styles/grid-components.css";

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


export function GridContent1 ({data, day, dayForecastIndex, temp, func_f, func_c}) {

  return (
    handleData(data, () => {

      const currentDay = weekday[day.getDay()];
      return(
        <>
          <div id="gc1-container-temp">
            <span id="gc1-header-img-container">
              <img 
                src={!dayForecastIndex ? data.current.condition.icon : data.forecast.forecastday[dayForecastIndex].day.condition.icon} 
                alt={!dayForecastIndex ? data.current.condition.text : data.forecast.forecastday[dayForecastIndex].day.condition.text}  
              />

            </span>
            <div id="gc1-temperature-letters-container">
              <span id="gc1-temperature">{
                !dayForecastIndex ? (temp ? data.current.temp_f : data.current.temp_c) : (temp ? data.forecast.forecastday[dayForecastIndex].day.avgtemp_f : data.forecast.forecastday[dayForecastIndex].day.avgtemp_c)
              }</span>

              <span id="gc1-temperature-letter" className={`${temp ? "activated" : ""}`} onClick={func_f}> ºF</span>  
              <span id="gc1-temperature-letter"> | </span>  
              <span id="gc1-temperature-letter" className={`${!temp ? "activated" : ""}`}onClick={func_c}>ºC</span>  
            </div>

            <h3>
              {!dayForecastIndex ? data.current.condition.text : data.forecast.forecastday[dayForecastIndex].day.condition.text}
            </h3>
            <hr />

            <div id="gc1-footer-container">
              <div className="gc1-footer-box">
                <span className="gc1-img-footer-box">
                  <img src="../../icons/location.png" alt="" />
                </span>
                <span id="gc1-city">
                  {data.location.name} - {data.location.country}
                </span> 
              </div>
              <div className="gc1-footer-box">
                <span className="gc1-img-footer-box">
                  <img src="../../icons/calendar.png" alt="" />
                </span>
                <span id="gc1-hour">
                  {!dayForecastIndex ? data.location.localtime : data.forecast.forecastday[dayForecastIndex].date}
                </span>
              </div>
            </div>
          </div>
        </>
      )
    })
  )
}


export function GridContent2 ({data, temp_f, dayForecastIndex}) {

  return (
    handleData(data, () => {
      return (
        <>
          <div id="gc2-continer">
            <Gc2Main
              data = {data}
              temp_f = {temp_f}
              dayForecastIndex= {dayForecastIndex}
            />
          </div>
        </>
      )
    })
  )
}

export function GridContent4 ({data, day, forecastHandler, forecastDay, temp_f, dayForecastIndex, setDayForecastIndex}) {

  return (
    handleData(data, () => {
      const weekTime = [day.getDay()];
      return(
        <section id="gc4-continer">
          <ForecastSelection 
          forecastHandler = {forecastHandler}
          forecastDay = {forecastDay}
          />
          {
            data.forecast.forecastday.map((arg, index) => {
              return(
                <ForecastDay 
                  key = {Math.random()}
                  data = {arg}
                  temp_f= {temp_f}
                  weekday = {weekday}
                  currentDay = {(parseInt(weekTime) + index) % 6 }
                  today= {(index === 0)}
                  setDayForecastIndex= {setDayForecastIndex}
                  dayForecastIndex= {dayForecastIndex}
                  index= {index}
                />
              )
            })
          }
        </section>
      )
    })
  )
}


export function GridContent5 ({data, locationHandler, countryCode, setLocation}) {

  const info = [{ country: countryCode, value: ` - ${data && data.location ? data.location.name : ""}` }];

  
  return(
    <div id="gc5-container">
      <SearchBar setLocation= {setLocation}/>
      <div id="gc5-svg-map-container">
        <WorldMap
          color="#000"
          backgroundColor="#141414"
          borderColor="white"
          strokeOpacity={0.4}
          size="lg"
          richInteraction = {true}
          onClickFunction={locationHandler}
          data={info}
        />
      </div>
    </div>
  )
}

// data Handler
export function handleData (data, callback) {
  if (!data) {
    return (
      <div>
        not set...
      </div>
    ) 
  } else if (data && !data.current && data.error.code === 1006) {
    return (
      <div>
        No matching location found...
      </div>
    )
  } else if (data && !data.current && data.error) {
    return (
      <div>
        {data.error}
      </div>
    )
  } else {
    return callback();
  } 
}