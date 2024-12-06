import React, { useEffect,useState } from "react";
import { 
  Wind, 
  Droplet, 
  Eye, 
  CloudRain, 
  Thermometer,
  CloudFog
} from 'lucide-react';
import axios from "axios";


const WeatherCard = ({ location, isDarkMode }) => {

  const [weather, setWeatherData] = useState(null);

  const fetchWeatherData = async (location) => {
    try {
      const response = await axios.get('http://localhost:5000/api/weather/' + location);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  },[location])
  
  const weatherData = {
    temperature: weather?.main.temp || 72,
    feelsLike: weather?.main.feelsLike || 70,
    description: weather?.weather[0].description || "Rainy",
    details: {
      windSpeed: weather?.wind.speed || 5,
      humidity: weather?.main.humidity || 50,
      visibility: weather?.visibility || 10,
      pressure: weather?.main.pressure || 1012
    }
  };

  const weatherIcons = {
    "Rainy": CloudRain,
    "Cloudy": CloudFog
  };

  const WeatherIcon = weatherIcons[weatherData.description] || CloudRain;


  return (
    <div className={`
      ${isDarkMode 
        ? 'bg-gray-800/60 text-gray-100 border-gray-700' 
        : 'bg-white/80 text-gray-900'}
      h-fit-content
      backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl 
      transition-all border border-opacity-10
    `}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className={`
            text-xl font-semibold 
            ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
          `}>
            {location}
          </div>
          <div className={`
            text-sm 
            ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          `}>
            Current Weather
          </div>
        </div>
        <WeatherIcon 
          size={40} 
          className={`
            ${isDarkMode ? 'text-blue-300' : 'text-blue-500'} 
            opacity-70
          `}
        />
      </div>
      
      <div className="text-center mb-4">
        <h1 className={`
          text-5xl font-bold 
          ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}
        `}>
          {weatherData.temperature}°
        </h1>
        <p className={`
          ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
        `}>
          {weatherData.description}, Feels like {weatherData.feelsLike}°
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Wind, label: "Wind", value: `${weatherData.details.windSpeed} mph` },
          { icon: Droplet, label: "Humidity", value: `${weatherData.details.humidity}%` },
          { icon: Eye, label: "Visibility", value: `${weatherData.details.visibility} mi` },
          { icon: Thermometer, label: "Pressure", value: `${weatherData.details.pressure} in` }
        ].map(({ icon: Icon, label, value }, index) => (
          <div 
            key={index} 
            className={`
              flex items-center space-x-2 
              ${isDarkMode 
                ? 'bg-gray-700/50 text-gray-100' 
                : 'bg-blue-50 text-gray-900'}
              p-3 rounded-lg
            `}
          >
            <Icon 
              size={20} 
              className={`
                ${isDarkMode ? 'text-blue-300' : 'text-blue-500'} 
                opacity-70
              `} 
            />
            <div>
              <div className={`
                text-xs 
                ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
              `}>
                {label}
              </div>
              <div className={`
                font-semibold 
                ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}
              `}>
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;