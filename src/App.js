import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [city, setCity] =useState("Chandigarh");
  const [res ,setRes] =useState();
  const [weather, setWeather] =useState('');
  const [wind, setWind] =useState('');
  
  
  var currentdate = new Date();

  var datetime = `${currentdate.getDay() }/${currentdate.getMonth() }/${currentdate.getFullYear()}
  ${ currentdate.getHours() }:
  ${currentdate.getMinutes() }:${currentdate.getSeconds()}`;
  
  

   useEffect(() => {
     const apiData = async ()=>{
     const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e354a9cf48b49372def5c142620655eb`); 

     const data = await response.json();
    const {main,sys,wind} = await data;
      setRes(main);
      
      // const{country} = await sys;
      setWeather(sys);
      // const {speed} = await wind;
      setWind(wind)
  }    
     apiData();
   }, [city])
   
   
  return (
   <>
   <div className='container'>
    <div >
    <input className='input' type="search" onChange={(event)=>{setCity(event.target.value)}} placeholder='  Search for weather...'>
    </input>
    
    </div>
    { !res ? (<p>No Data Found</p>) : (
          <div>
            
          <div className='info'>
           <h3 className='heading'>Current Weather {city},{weather.country}</h3>
          <p> {datetime}</p>
          </div>
          <div className='info'>
          <i className="fas fa-sun"></i>
          <p>{res.temp}° C </p>
    
          </div>
          <div className='info'>
            
            <p>FEELS LIKE  {res.feels_like}° C</p>
            
          </div>
          <table>
           <td className='list'>Max temp < br/>{res.temp_max}° C</td>
           <td className='list'> Min temp < br/>{res.temp_min}° C</td>
            <td className='list'>Wind Speed < br/>{wind.speed}</td>
            <td className='list'>HUMIDITY < br/>{res.humidity}%</td>
            <td className='list'>PRESSURE < br/>{res.pressure} mb</td>
            
          </table>
    
        </div>
    )}
    
   
    </div>
   </>
  );
}

export default App;
