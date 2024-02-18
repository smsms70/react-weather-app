import { useState } from "react"
import "../styles/gc2-main.css"


export function Gc2Main ({data, temp_f, dayForecastIndex}) {
  const [selection, setSelection] = useState('')

  return (
    <main id="gc2-main-container">
      
        <GraphicSection 
          data= {data}
          selection= {selection}
          temp_f= {temp_f}
          setSelection={setSelection}
          dayForecastIndex= {dayForecastIndex}
        />
      
      <section id="specific-data-box-container">
        <DataBox
          name= {!dayForecastIndex ? "Humidity" : "Avg Humidity"}
          data= {
            !dayForecastIndex ? data.current.humidity : 
            data.forecast.forecastday[dayForecastIndex].day.avghumidity
          }
          img= {"../../icons/drop.png"}
          footer= {"%"}
          funcNum= {0}
          setSelection={setSelection}
          activated= {selection == "humidity"}
        />
        <DataBox
          name= {!dayForecastIndex ? "Wind speed" : "Max Wind"}
          data= {
            !dayForecastIndex ? data.current.wind_mph :
            data.forecast.forecastday[dayForecastIndex].day.maxwind_mph
          }
          data2= {
            !dayForecastIndex ? data.current.wind_kph :
            data.forecast.forecastday[dayForecastIndex].day.maxwind_kph
          }
          img= {"../../icons/wind.png"}
          footer= {"Mh"}
          footer2= {"Kh"}
          temp_f= {temp_f}
          funcNum= {1}
          setSelection={setSelection}
          activated= {selection == "wind"}
        />
        <DataBox
          name= {"UV"}
          data= {
            !dayForecastIndex ? data.current.uv :
            data.forecast.forecastday[dayForecastIndex].day.uv
          }
          img= {""}
          funcNum= {2}
          setSelection={setSelection}
          activated= {selection == "uv"}
        />
        <DataBox
          name= {!dayForecastIndex ? "Feels like" : "Avg Temp"}
          data= {
            !dayForecastIndex ? data.current.feelslike_f :
            data.forecast.forecastday[dayForecastIndex].day.avgtemp_f
          }
          data2= {
            !dayForecastIndex ? data.current.feelslike_c :
            data.forecast.forecastday[dayForecastIndex].day.avgtemp_c
          }
          img= {"../../icons/temperature.png"}
          footer= {"ºF"}
          footer2= {"ºC"}
          temp_f= {temp_f}
          funcNum= {3}
          setSelection={setSelection}
          activated= {selection == "feels"}
        />
      </section>
    </main>
  )
}
export function DataBox ({name, data, data2, img, footer, footer2, funcNum, activated, temp_f = false, setSelection}) {

  const selec = ["humidity", "wind", "uv", "feels"];

  const selectionHandler = () => {
    setSelection(selec[funcNum])
  }
  return(
    <div className={`specific-data-box ${activated ? "activated" : ""}`} onClick={selectionHandler}>
      <span className="specific-data-name-holder">{name} </span>
      <div>
        <p className="specific-data-data">{Math.floor(!data2 ? data : temp_f ? data : data2)}</p>
        <span className="specific-data-img-container">
          <img src={img} alt=""/>
        </span>
        <p className="specific-data-footer">{!footer2 ? footer : temp_f ? footer : footer2}</p>
      </div>
    </div>
  )
}


export function GraphicSection ({data, selection, temp_f, dayForecastIndex, setSelection}) {
  const handleSelection = () => setSelection("");
  return(
    <section id="gc2-graph-container">
      <span id="reload-img-container" onClick={handleSelection} className={!selection ? "hidden" : ""}>
        <img src="../../icons/reload.png" alt="" />
      </span>
      <div id="rules-container-gc2">
        {data.forecast.forecastday[dayForecastIndex].hour.map((event) => {
          return (
            <GraphRules
              key={Math.random()}
              size={
                selection == "" ? ((temp_f ? event.temp_f : event.temp_c)) :
                selection == "humidity" ? event.humidity :
                selection == "wind"? (temp_f ? event.wind_kph : event.wind_mph ) :
                selection == "uv" ? event.uv :
                selection == "feels" ? (temp_f ? event.feelslike_f : event.feelslike_c ) : ""
              }
              temp_f= {selection == "humidity" ? true : temp_f}
            />
          )
        })}
      </div>
    </section>
  )
}

export function GraphRules ({size, temp_f}) {
  
  const style = {
    height: `${temp_f ? Math.abs(size) : Math.abs(size)*3}%`,
    backgroundColor: (size > 0) ? "grey" : "#56c9ff"
  }
  return(
    <div className="ruler-from-gc2-graph" style={style}></div>
  )
}