import React from "react";
import { Sunrise, Sunset, Moon, Sun } from 'lucide-react';

const SunMoonSummary = ({ location, isDarkMode }) => {
  const sunMoonData = {
    sunrise: "5:43 AM",
    sunset: "6:30 PM",
    moonPhase: "Waxing Gibbous",
    dayLength: "12h 47m"
  };

  return (
    <div className={`
      ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} 
      p-4 rounded-lg shadow-md flex flex-col space-y-3
    `}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{location}</h2>
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