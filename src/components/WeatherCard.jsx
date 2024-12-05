import React from "react";
import { 
  Wind, 
  Droplet, 
  Eye, 
  CloudRain, 
  Thermometer,
  CloudFog
} from 'lucide-react';

const WeatherCard = ({ location }) => {
  // Mock data - in a real app, this would come from an API
  const weatherData = {
    temperature: 12,
    feelsLike: 10,
    description: "Rainy",
    details: {
      airQuality: 156,
      windSpeed: 1,
      humidity: 54,
      visibility: 3,
      pressure: 27.65
    }
  };

  const weatherIcons = {
    "Rainy": CloudRain,
    "Cloudy": CloudFog
  };

  const WeatherIcon = weatherIcons[weatherData.description] || CloudRain;

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-xl font-semibold text-gray-600">{location}</div>
          <div className="text-sm text-gray-500">Current Weather</div>
        </div>
        <WeatherIcon 
          size={40} 
          className="text-blue-500 opacity-70" 
        />
      </div>
      
      <div className="text-center mb-4">
        <h1 className="text-5xl font-bold text-blue-600">{weatherData.temperature}°</h1>
        <p className="text-gray-600">
          {weatherData.description}, Feels like {weatherData.feelsLike}°
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Wind, label: "Wind", value: `${weatherData.details.windSpeed} mph` },
          { icon: Droplet, label: "Humidity", value: `${weatherData.details.humidity}%` },
          { icon: Eye, label: "Visibility", value: `${weatherData.details.visibility} mi` },
          { icon: CloudFog, label: "Air Quality", value: weatherData.details.airQuality },
          { icon: Thermometer, label: "Pressure", value: `${weatherData.details.pressure} in` }
        ].map(({ icon: Icon, label, value }, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg"
          >
            <Icon size={20} className="text-blue-500 opacity-70" />
            <div>
              <div className="text-xs text-gray-500">{label}</div>
              <div className="font-semibold text-gray-700">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;