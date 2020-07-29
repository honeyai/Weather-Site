import React, { useState } from 'react';
import {Button} from '@material-ui/core'
import WeatherGet from './WeatherGet';

const Landing = () => {

  const [zip, setZip] = useState("");
  const [reveal, setReveal] = useState(false);

  return (
    <div className="landing__container">
      {reveal? <WeatherGet zip={zip} /> : null}
      <form action="">
        <input type="text" name="zipcode" id="zipcode" onChange={(event) => {
          setZip(event.target.value);
          setReveal(false);
          console.log('this is zip code', zip);
          }}/>
        <Button onClick={() => setReveal(true)}>Submit</Button>
      </form>
      {/* Once the button is clicked i want the zip code to be set as part of the url of the base url */}
      {/* where do i make those calls? */}
      {/* WeatherDayCard acts like posts */}
    </div>
  );
};

export default Landing;