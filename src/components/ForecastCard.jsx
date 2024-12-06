import React, { useEffect, useState } from "react";
import { CloudRain, CloudFog, Sun, Cloud, CloudSun } from 'lucide-react';
import axios from 'axios';

// Mapping weather icons to Lucide icons based on icon codes
const getWeatherIcon = (iconCode) => {
  const iconMap = {
    '01d': Sun,   // clear sky day
    '01n': Sun,   // clear sky night
    '02d': CloudSun, // few clouds day
    '02n': CloudSun, // few clouds night
    '03d': Cloud, // scattered clouds day
    '03n': Cloud, // scattered clouds night
    '04d': Cloud, // broken clouds day
    '04n': Cloud, // broken clouds night
    '09d': CloudRain, // shower rain day
    '09n': CloudRain, // shower rain night
    '10d': CloudRain, // rain day
    '10n': CloudRain, // rain night
    '11d': CloudFog, // thunderstorm day
    '11n': CloudFog, // thunderstorm night
    '13d': CloudFog, // snow day
    '13n': CloudFog, // snow night
    '50d': CloudFog, // mist day
    '50n': CloudFog, // mist night
    default: Cloud
  };

  return iconMap[iconCode] || iconMap.default;
};

const ForecastCard = ({ location, isDarkMode }) => {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeekWeathers = async (location) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/forecast/${location}`);
      
      // Transform the forecast data
      const transformedData = response.data.list.map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description: item.weather[0].description,
        temperature: Math.round(item.main.temp),
        icon: getWeatherIcon(item.weather[0].icon)
      }));

      setForecastData(transformedData);
      setError(null);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      setError('Failed to fetch forecast data');
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeekWeathers(location);
    }
  }, [location]);

  if (loading) {
    return (
      <div className={`
        ${isDarkMode ? 'bg-gray-800/60 text-gray-100' : 'bg-white/80 text-gray-900'}
        backdrop-blur-md p-6 rounded-xl shadow-lg
      `}>
        Loading forecast...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`
        ${isDarkMode ? 'bg-gray-800/60 text-gray-100' : 'bg-white/80 text-gray-900'}
        backdrop-blur-md p-6 rounded-xl shadow-lg text-red-500
      `}>
        {error}
      </div>
    );
  }

  return (
    <div className={`
      ${isDarkMode
        ? 'bg-gray-800/60 text-gray-100 border-gray-700'
        : 'bg-white/80 text-gray-900'}
      backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl
      transition-all border border-opacity-10
      
    `}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className={`
            text-xl font-semibold
            ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
          `}>
            Tomorrow
          </div>
          <div className={`
            text-sm
            ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          `}>
            {location} Forecast
          </div>
        </div>
      </div>
     
      <div className="space-y-3 overflow-y-auto h-[200px]">
        {forecastData.map((forecast, index) => {
          const Icon = forecast.icon;
          return (
            <div
              key={index}
              className={`
                flex items-center justify-between
                ${isDarkMode
                  ? 'bg-gray-700/50 hover:bg-gray-700/70'
                  : 'bg-blue-50 hover:bg-blue-100'}
                p-3 rounded-lg transition-colors
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  size={24}
                  className={`
                    ${isDarkMode ? 'text-blue-300' : 'text-blue-500'}
                    opacity-70
                  `}
                />
                <div>
                  <div className={`
                    font-medium
                    ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}
                  `}>
                    {forecast.time}
                  </div>
                  <div className={`
                    text-sm
                    ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                  `}>
                    {forecast.description}
                  </div>
                </div>
              </div>
              <div className={`
                text-lg font-bold
                ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}
              `}>
                {forecast.temperature}°
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;