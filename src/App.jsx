import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import SunMoonSummary from "./components/SunMoonSummary";
import "./index.css";

function App() {
  const [location, setLocation] = useState("New York");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`
      min-h-screen 
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' 
        : 'bg-gradient-to-br from-blue-100 to-blue-200 text-gray-900'}
      transition-colors duration-300 ease-in-out
    `}>
      <Navbar 
        onLocationSearch={handleLocationChange} 
        currentLocation={location}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherCard 
          location={location} 
          isDarkMode={isDarkMode} 
        />
        <ForecastCard 
          location={location} 
          isDarkMode={isDarkMode} 
        />
        <SunMoonSummary 
          location={location} 
          isDarkMode={isDarkMode} 
        />
      </div>
    </div>
  );
}

export default App;