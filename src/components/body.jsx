import {useState} from "react";
import {useFetch} from "../config/useFetch";
import { GridContent1, GridContent2, GridContent4, GridContent5 } from "./grid-components.jsx";
import "../styles/body.css";

export default function BodyComponent () {
  const [location, setLocation] = useState(null);
  const [temp_f, setTemp_f] = useState(true);
  const [forecastDays, setForecastDays] = useState("3");
  const [justDays, setJustDays] = useState(false);
  const [dayForecastIndex, setDayForecastIndex] = useState(0);
  const [countryCode, setCountryCode] = useState("");
  const [data, loading] = useFetch(location, forecastDays, justDays, setJustDays);

  const currentDay = (data && data.current ? new Date(data.current.last_updated) : null);


  const temp_fHandler = () => setTemp_f(true);
  const temp_cHandler = () => setTemp_f(false);

  const locationHandler = e => setLocation(e.target.value);

  const mapLocationHandler = e => {
    setLocation(e.countryName);
    setCountryCode(e.countryCode);
    setDayForecastIndex(0)
  };

  const forecastDaysHandler = e => {
    setForecastDays(e.target.value);
    setJustDays(true);
  };


  console.log(loading, forecastDays, dayForecastIndex);
  return (
    <>
      <section id="body-components-container">
        <main id={`grid-container`} className = {loading ? 'isLoading' : ''}>
          <div className="grid-component grid-1">
            {!loading && <GridContent1 
              data= {data} 
              day= {currentDay}
              temp= {temp_f}
              func_f= {temp_fHandler}
              func_c= {temp_cHandler}
              dayForecastIndex= {dayForecastIndex}
            />}
          </div>
          <div className="grid-component grid-2">
            {!loading && <GridContent2 
              data= {data} 
              temp_f= {temp_f}
              dayForecastIndex= {dayForecastIndex}

            />}
          </div>
          <div className={`grid-component grid-4 ${justDays && "Loading"}`} >
            {!loading && !justDays && <GridContent4 
              data = {data} 
              day = {currentDay} 
              forecastHandler={forecastDaysHandler}
              forecastDay = {forecastDays}
              temp_f= {temp_f}
              dayForecastIndex= {dayForecastIndex}
              setDayForecastIndex= {setDayForecastIndex}
          />}
          </div>
          <div className="grid-component grid-5">
            {!loading && <GridContent5 
              data = {data} 
              locationHandler = {mapLocationHandler}
              countryCode = {countryCode}
              setLocation= {setLocation}
            />}
          </div>
        </main>
      </section>
    </>
  )
}