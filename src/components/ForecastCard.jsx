import React from "react";
import { CloudRain, CloudFog, Sun } from 'lucide-react';

const ForecastCard = ({ location }) => {
  // Mock forecast data - in a real app, this would come from an API
  const forecastData = [
    { time: "1 AM", description: "Mostly Cloudy", temperature: 10, icon: CloudFog },
    { time: "4 AM", description: "Light Rain", temperature: 8, icon: CloudRain },
    { time: "7 AM", description: "Partly Cloudy", temperature: 12, icon: Sun },
    { time: "10 AM", description: "Cloudy", temperature: 14, icon: CloudFog },
    { time: "1 PM", description: "Rainy", temperature: 15, icon: CloudRain }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-xl font-semibold text-gray-600">Tomorrow</div>
          <div className="text-sm text-gray-500">{location} Forecast</div>
        </div>
      </div>
      
      <div className="space-y-3">
        {forecastData.map((forecast, index) => {
          const Icon = forecast.icon;
          return (
            <div 
              key={index} 
              className="flex items-center justify-between bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon size={24} className="text-blue-500 opacity-70" />
                <div>
                  <div className="font-medium text-gray-700">{forecast.time}</div>
                  <div className="text-sm text-gray-500">{forecast.description}</div>
                </div>
              </div>
              <div className="text-lg font-bold text-blue-600">{forecast.temperature}°</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;