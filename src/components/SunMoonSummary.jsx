import React from "react";
import { Sunrise, Sunset, Moon, Sun } from 'lucide-react';

const SunMoonSummary = ({ location }) => {
  // Mock data - in a real app, this would come from an API
  const sunMoonData = {
    sunrise: "5:43 AM",
    sunset: "6:30 PM",
    moonPhase: "Waxing Gibbous",
    dayLength: "12h 47m"
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
      <div className="mb-4">
        <div className="text-xl font-semibold text-gray-600">Sun & Moon</div>
        <div className="text-sm text-gray-500">{location} Summary</div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <Sunrise size={24} className="text-orange-500" />
            <div>
              <div className="font-medium text-gray-700">Sunrise</div>
              <div className="text-sm text-gray-500">{sunMoonData.sunrise}</div>
            </div>
          </div>
          <Sun size={24} className="text-yellow-500" />
        </div>
        
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <Sunset size={24} className="text-orange-500" />
            <div>
              <div className="font-medium text-gray-700">Sunset</div>
              <div className="text-sm text-gray-500">{sunMoonData.sunset}</div>
            </div>
          </div>
          <Moon size={24} className="text-indigo-500" />
        </div>
        
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <Sun size={24} className="text-yellow-500" />
            <div>
              <div className="font-medium text-gray-700">Day Length</div>
              <div className="text-sm text-gray-500">{sunMoonData.dayLength}</div>
            </div>
          </div>
          <Moon size={24} className="text-indigo-500" />
        </div>
      </div>
    </div>
  );
};

export default SunMoonSummary;