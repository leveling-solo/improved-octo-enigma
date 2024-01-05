import "./App.css"
import { useEffect, useState } from 'react';
import axios from "axios" ; 
function App() {
  const [inputData, setInputData] = useState({
    input: "Bokaro",
    temperature: "",
    location: "",
    humidity: "",
    windSpeed: "",
    img: ""
  });

 
  const fetchWeatherData = async ()=>{
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY ; 

    if(!apiKey){
      console.error("Api key is missing , Make sure to set REACT_APP_WEATHER_KEY in your enviorment "); 
      return ; 
    }
    const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${inputData.input}`;

    try{
      const response = await axios.get(apiUrl) ; 
      if(response.data && response.data.current){
        setInputData((inputData)=>({
          ...inputData, 
          temperature : response.data.current.temperature, 
          location : response.data.location.name ,
          humidity : response.data.current.humidity , 
          windSpeed : response.data.current.wind_speed , 
          img : response.data.current.weather_icons[0], 
        })); 
      }else{
        console.error("Invalid data structure received from API", response.data); 
      }
    }catch(error){
      console.error("Error fetching weather Data : ", error) ; 
    }
  } ; 
  useEffect(()=>{
  fetchWeatherData() ; 
  },[])
  function change(event) {
    const { name, value } = event.target;
    setInputData((inputData) => ({
      ...inputData,
      [name]: value,
    }));
  }
  const submit =async(event) => {
    event.preventDefault();
    try{
      await fetchWeatherData();
    }catch(error){
      console.log("Error fetching weather Data : ", error)
    }
  }

 


  return (
    <div className='container'>
      <div className='SearchPlaces'>
        <form onSubmit={submit}>
          <input
            type='text'
            placeholder='Bokaro'
            name='input'
            onChange={change}
          />
          <button><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
      </div>

      <main>
        <div className='weatherImage'>
          <img src={inputData.img} alt='' />
        </div>
        <div className='weatherDetails'>
          <div>{inputData.temperature}°<span>c</span></div>
          <div>{inputData.location}</div>
        </div>
        <div className='box1'>
          <div className='humidity'>
            <div className="hum">
            <i className="fas fa-tint"></i>
               {inputData.humidity}%</div>
            <h1>Humidity</h1>
          </div>
          <div className='windSpeed'>
            <div className="speed">
            <i class="fa-solid fa-wind"></i> 
               {inputData.windSpeed} km/h</div>
            <h1>Wind Speed</h1>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
