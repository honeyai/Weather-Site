import React from 'react';
import { Card } from '@material-ui/core';
import '../Styles/weatherCard.css'

const WeatherCard = ({place, day, image, min, max}) => {
  return (
    <Card id="weatherCard">
      <div className="weatherCard__container">
        {/* <center> */}
          <span className="locationLine">
          </span>
          <span>{day}</span>
          <img className="weatherIcon" src={image} alt="weather icon"/>
          <div className="tempLine">
            <span className="maxTemp">{max}&deg;</span>
            <span className="minTemp">{min}&deg;</span>
          </div>
        {/* </center> */}
      </div>
    </Card>
  );
};

export default WeatherCard;