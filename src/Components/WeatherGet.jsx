import React, { useState, useEffect } from 'react';
import Header from './Header';
import WeatherCard from './WeatherCard';
import axios from 'axios';



const getCurrentDay = num => {
  let unix_timestamp = num;
  var date = new Date(unix_timestamp * 1000);
  return date.toString().slice(0, 10);
}


const WeatherGet = ({ zip }) => {
  
  const KEY = "a399ddb32ac75b5380f27f6a5765dcdd";
  
  const BASE_URL = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&units=imperial&exclude=hourly,minutely,current&appid=${KEY}`;

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false);

  let forecast = [];

  async function getWeather() {
    try {
      let response = await axios.get(BASE_URL);
      setData(response.data)
    } catch (error) {
      console.error("!!Señor!! PROBLEMA:", error.message)
    }
    setLoading(true);
  }

  console.log("this is the data list,", data.list)

  
  if (loading) {
    let currentString = data.list[0].dt_txt.substring(0,10);
    data.list.forEach(index => {
      if (forecast.length === 0){
        forecast.push(data.list[0]);
      } else if(currentString !== index.dt_txt.substring(0,10)){
        currentString = index.dt_txt.substring(0,10);
        forecast.push(index);
      } else { 
        console.log("this is current string", currentString);
      }
    })
  } 

  useEffect(() => {
    getWeather();
  }, [])

  return (
    <div>
      <Header name="weatherCard__header" content="{<span>Getting Forecast for: {place}</span>}" />
    </div>
  );
};

export default WeatherGet;
