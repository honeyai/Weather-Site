import React, { useState, useEffect } from 'react';
import Header from './Header';
import WeatherCard from './WeatherCard';
import axios from 'axios';

const WeatherGet = ({zip}) => {

  const [place, setPlace] = useState("");
  const [day, setDay] = useState("");
  const [image, setImage] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [weather, setWeather] = useState([]);
  let forecast = [];

  const KEY = "a399ddb32ac75b5380f27f6a5765dcdd";

  const BASE_URL = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&units=imperial&exclude=hourly,minutely,current&appid=${KEY}`;


  const getCurrentDay = num => {
    let unix_timestamp = num;
    var date = new Date(unix_timestamp * 1000);
    return date.toString().slice(0,10);
  }

  const makeIcon = iconId => `https://openweathermap.org/img/wn/${iconId}@2x.png`;
  
  let weatherData;
  let response

  async function getWeather() {
    try {
      response = await axios.get(BASE_URL);
      weatherData = response.data;
      console.log("this is weatherData", weatherData);
      // console.log("this is the max temp", weatherData.list[0].main.temp_max);
      // console.log("this is the min temp", weatherData.list[0].main.temp_min);
      // console.log("this is the iconId", weatherData.list[0].weather[0].icon);
      // console.log("this is the place name", weatherData.city.name);
      // console.log("this is the day", day);
      // console.log("This is the weatherbaseData", (getCurrentDay(weatherData.list[5].dt)))
      // console.log("This is the weatherbaseData", (getCurrentDay(weatherData.list[6].dt)))
      // console.log("This is the weatherbaseData", (getCurrentDay(weatherData.list[1].dt)))
      // console.log("This is the weatherbaseData", (getCurrentDay(weatherData.list[0].dt)))

      // console.log("sup wiley")
      let currentString = weatherData.list[0].dt_txt.substring(0,10);
      console.log("this is currentstring", currentString)

      weatherData.list.forEach(index => {
        if (forecast.length === 0){
          forecast.push(weatherData.list[0]);
        } else if(currentString !== index.dt_txt.substring(0,10)){
          currentString = index.dt_txt.substring(0,10);
          console.log("this is current string", currentString);
          console.log("this is index string", index.dt_txt.substring(0,10));
          forecast.push(index);
          console.log("forecast", forecast);
        } else { 
          console.log("this is current string", currentString);
        }
      })
      console.log("this is forecast.list, Wiley do you see it!?", forecast)
      forecast.map(index => {
        console.log("this is index, good sir Wiley", index)
        let temp1 =index.main.temp_max;
        setMaxTemp(temp1)
        console.log("this is max temp,", index.main.temp_max)
        setMinTemp(index.main.temp_min)
        setImage(makeIcon(index.weather[0].icon))
        setPlace(weatherData.city.name)
        setDay((getCurrentDay(index.dt)))
        setWeather([{
          maxTemp: index.main.temp_max,
          minTemp: index.main.temp_min,
          image: makeIcon(index.weather[0].icon),
          place: weatherData.city.name,
          day: getCurrentDay(index.dt),
        }])
      })
    } catch(error) {
      console.error("we gots a problem, Wiley!", error.message)
    }
  }
  
  console.log("this is max temp,", {maxTemp})
  console.log("this is weather,", weather)
 
  useEffect(() => {
    getWeather();
  }, [])
  
  return (
    <div>
      <Header name="weatherCard__header" content={<span>Getting Forecast for: {place}</span>}/>
      {
        weather.map((key) => ( 
          <WeatherCard 
            key={key}
            place={place}
            day={day}
            image={image}
            min={minTemp}
            max={maxTemp}
          />
          ))
      }
    </div>
  );
};

export default WeatherGet;