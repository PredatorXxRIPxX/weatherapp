import React, { useEffect, useState } from "react";
import { Sunrise, Sunset, Moon, Sun } from 'lucide-react';
import axios from 'axios';

const SunMoonSummary = ({ location, isDarkMode }) => {
  const [fetchResponse, setFetchResponse] = useState(null);

  const fetchData = async (location) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/temperature/${location}`);    
      setFetchResponse(response.data.weatherData);
      console.log("sunmon", response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (location) {
      fetchData(location);
    }
  }, [location]);

  // Convert Unix timestamp to readable time
  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate day length
  const calculateDayLength = (sunrise, sunset) => {
    if (!sunrise || !sunset) return "N/A";
    const dayLengthSeconds = sunset - sunrise;
    const hours = Math.floor(dayLengthSeconds / 3600);
    const minutes = Math.floor((dayLengthSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const sunMoonData = {
    sunrise: fetchResponse?.sys?.sunrise ? formatTime(fetchResponse.sys.sunrise) : "N/A",
    sunset: fetchResponse?.sys?.sunset ? formatTime(fetchResponse.sys.sunset) : "N/A",
    moonPhase: "Waxing Gibbous",
    dayLength: fetchResponse?.sys?.sunrise && fetchResponse?.sys?.sunset 
      ? calculateDayLength(fetchResponse.sys.sunrise, fetchResponse.sys.sunset) 
      : "N/A"
  };

  if (!fetchResponse) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`
      ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
      p-4 rounded-lg shadow-md flex flex-col space-y-3
    `}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{fetchResponse.name}</h2>
        <div className="flex items-center space-x-2">
          <Sun className="w-6 h-6 text-yellow-500" />
          <Moon className="w-5 h-5 text-blue-400" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Sunrise className="w-5 h-5" />
          <div>
            <p className="text-sm font-medium">Sunrise</p>
            <p className="font-bold">{sunMoonData.sunrise}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Sunset className="w-5 h-5" />
          <div>
            <p className="text-sm font-medium">Sunset</p>
            <p className="font-bold">{sunMoonData.sunset}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Day Length</p>
          <p className="font-bold">{sunMoonData.dayLength}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Moon Phase</p>
          <p className="font-bold">{sunMoonData.moonPhase}</p>
        </div>
      </div>
    </div>
  );
};

export default SunMoonSummary;