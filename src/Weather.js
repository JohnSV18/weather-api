import { useState } from 'react';
import './Weather.css';
import WeatherDisplay from './WeatherDisplay';

import RadioButton from './RadioButton';

function Weather() {
    const [zip, setZip] = useState('94210');
    const [unit, setUnit] = useState('');
    const [data, setData] = useState(null);

    // -------------------------------------------
    async function fetchWeather() {
        const apikey = '4647aaef88d6e0fbf8feeb4ce0f0cb50'
        const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=${unit}`;
        const res = await fetch(path)
        const json = await res.json();
        // console.log(json);
        const cod = json.cod;
        const message = json.message;

        if (cod !=200) {
          setData({ cod, message });
        }
        const temp = json.main.temp;
        const feelsLike = json.main.feels_like;
        const description = json.weather[0].description;
        const cityName = json.name
        console.log(json);
        


        setData({
            temp,
            feelsLike,
            description,
            cityName,
            cod,
            message
        })


        

    }
    // -------------------------------------------

    // data = { temp :}
    return (
        <div className='Weather'>
            {data ? <WeatherDisplay {...data}/>: <p>Ready</p>}
            <form onSubmit={(e) => {
                e.preventDefault();
                fetchWeather();
                // load weather data
                // setData(newData);
            }}>
                <div>
                    <input
                        placeholder='Enter a Zip Code'
                        value={zip}
                        onChange={(e) => setZip(e.target.value)} />
                    <button type='submit'>Submit</button>
                </div>
                
                <select
                    value={unit}
                    onChange={ e => setUnit(e.target.value)}
                >
                    <option value="metric">Celcius</option>
                    <option value="imperial">Fahrenheit</option>
                    <option value="standard">Kelvin</option>
                </select>
                <RadioButton
                    label="Metric"
                    name="unit"
                    checked={unit === 'metric'}
                    onChange={() => setUnit('metric')}
                />
                <RadioButton
                    label="Imperial"
                    name="unit"
                    checked={unit === 'imperial'}
                    onChange={() => setUnit('imperial')}
                />
                <RadioButton
                    label="Standard"
                    name="unit"
                    checked={unit === 'standard'}
                    onChange={() => setUnit('standard')}
                />
                
            </form>
        </div>
    )
}
export default Weather;