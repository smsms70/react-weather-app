const PORT = 8000;
import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
dotenv.config();

const app = express();
app.use(cors());

const API_KEY = process.env.REACT_APP_API_KEY;
app.get("/", (req, res) =>{
  res.json("playing with nodemon")
})


app.get("/forecast", (req, res) =>{

  
  const location = req.query.location;
  const days = req.query.days;
  const URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=${days}&aqi=no&alerts=no`;

  if (!API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid API key' });
  }
  console.log(req.query.location, req.query.days)
  fetch(URL)
  .then(response => response.json())
  .then(data => {
    res.json(data)
  })
  .catch(err => console.log(err))

})



app.listen(PORT, () => console.log("Server is running on port 8000"))