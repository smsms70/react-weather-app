import {useState, useEffect } from 'react';
import axios from "axios";

export function useFetch (location, days, justDays, setJustDays, setDayForecastIndex) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const URL2 = "http://localhost:8000/forecast";
  const params = { 
    location: location,
    days: days 
  }
  
  useEffect(() => {
    if (location) {
      !justDays && setLoading(true);

      axios.get(URL2,{params})
      .then(response => {
        setData(response.data);
        console.log("data: ");
        console.log(data);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setDayForecastIndex(0)
        setLoading(false);
        setJustDays(false);
      });

    }
  }, [location, days]);

  return ([data || null, loading]);
}