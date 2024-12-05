import React from "react";
import { CloudRain, CloudFog, Sun } from 'lucide-react';

const ForecastCard = ({ location, isDarkMode }) => {
  // Mock forecast data - in a real app, this would come from an API
  const forecastData = [
    { time: "1 AM", description: "Mostly Cloudy", temperature: 10, icon: CloudFog },
    { time: "4 AM", description: "Light Rain", temperature: 8, icon: CloudRain },
    { time: "7 AM", description: "Partly Cloudy", temperature: 12, icon: Sun },
    { time: "10 AM", description: "Cloudy", temperature: 14, icon: CloudFog },
    { time: "1 PM", description: "Rainy", temperature: 15, icon: CloudRain }
  ];

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
      
      <div className="space-y-3">
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