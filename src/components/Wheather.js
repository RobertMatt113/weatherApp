import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Wheather = () => {
    
    const [weather, setWeather] = useState({});
    const [degrees, setDegrees] = useState(0);
    const [isKelvin, setIsKelvin] = useState(true);
    const [maxDeg, setMaxDeg] = useState(0);
    const [minDeg, setMinDeg] = useState(0);
    
    useEffect(()=>{
        function success(pos){
            let crd = pos.coords;

            console.log('Your current position is: ');
            console.log('Latitude: '+crd.latitude);
            console.log('Longitude: '+crd.longitude);
            console.log('More or less '+crd.accuracy+' meters.');

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=75f315a00794f700bb4e3b4dd4058bd9`).then((res) => {
                setWeather(res.data);
                setDegrees(res.data.main?.temp)
                setMaxDeg(res.data.main?.temp_max)
                setMinDeg(res.data.main?.temp_min)
            })
        }

        function error(err){
            console.log("el usuario no permitió dar la ubicacion");
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }, [])

    const changeDeg = () =>{
        if(isKelvin){
            // Turn from kelvin degrees to celsius degrees
            setDegrees(degrees-273.15);
            setMaxDeg(maxDeg-273.15);
            setMinDeg(minDeg-273.15);
            setIsKelvin(false);
        } else {
            // Turn from celsius degrees to kelvin degrees
            setDegrees(degrees+273.15);
            setMaxDeg(maxDeg+273.15);
            setMinDeg(minDeg+273.15);
            setIsKelvin(true);
        }
    }

    return (
        <div className='wheather'>

            <h2 className='title'>Weather App</h2>
            <h4 className='place'>{weather.name} {weather.sys?.country}</h4>

            <div className='description-container'>

                <div className='grades'>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                    <p>{Math.ceil(degrees)} {isKelvin ? "°k" : "°C"}</p>
                </div>

                <div className='info-container'>
                    <p id='main-weather'>"{weather.weather?.[0].description}"</p>
                    <p> <span>Wind speed:</span> {weather.wind?.speed} m/s</p>
                    <p> <span>Clouds:</span> {weather.clouds?.all}%</p>
                    <p> <span>Humidity level:</span> {weather.main?.humidity}g/m³</p>
                    <p> <span>Pressure:</span> {weather.main?.pressure} mb</p>
                    <p> <span>Temp max:</span> {Math.ceil(maxDeg)} {isKelvin ? "°k" : "°C"}</p>
                    <p> <span>Temp min:</span> {Math.ceil(minDeg)} {isKelvin ? "°k" : "°C"}</p>
                    <p></p>
                </div>
                
            </div>

            <button onClick={changeDeg}><i className='bx bx-sync'></i><p>Change Degrees</p></button>

        </div>
    );
};

export default Wheather;