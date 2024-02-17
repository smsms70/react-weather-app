import "../styles/forecast-days.css";

export function ForecastDay ({data, temp_f, weekday, currentDay, today, dayForecastIndex, setDayForecastIndex, index}) {
  
  const arr = [0, 1, 2, 3, 4 ,5 ,6 ,7 ,8 ,9 ];
  const handleForecastBoolean = () => setDayForecastIndex(arr[index]);

  return(
    <div className={`container-forecast-days-box ${dayForecastIndex === index ? "activated-forecast-day-box" : ""}`} onClick={handleForecastBoolean}>
      <div className="forecast-temp-box">
        <img 
          src={data.day.condition.icon} 
          alt={data.day.condition.text}
          // style={{filter: 'grayscale(100%)'}}
          className="forecast-days-img" 
        />
        <span className="forecast-maxtemp"> 
          +{
          temp_f ? 
          Math.floor(data.day.maxtemp_f) : 
          Math.floor(data.day.maxtemp_c)
          }º / 
        </span>
        <span className="forecast-mintemp">
          +{
          temp_f ? 
          Math.floor(data.day.mintemp_f): 
          Math.floor(data.day.mintemp_c)
          }º
        </span>
      </div>
      <p className={`forecast-day ${dayForecastIndex === index ? "activated-forecast-day" : ""}`} >{today ? "Today" : weekday[currentDay]}</p>
    </div>
  )
}