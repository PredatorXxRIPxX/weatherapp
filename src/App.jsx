import React, { useState } from "react";
import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import SunMoonSummary from "./components/SunMoonSummary";
import "./index.css";

function App() {
  const [location, setLocation] = useState("New York");
  
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen">
      <Navbar 
        onLocationSearch={handleLocationChange} 
        currentLocation={location} 
      />
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherCard location={location} />
        <ForecastCard location={location} />
        <SunMoonSummary location={location} />
      </div>
    </div>
  );
}

export default App;