import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import SunMoonSummary from "./components/SunMoonSummary";
import "./index.css";
import WeatherRecommendation from "./components/WeatherRecommendation";
import Statistique from "./components/Statistique";
import axios from "axios";

function App() {
  const [location, setLocation] = useState("New York");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [chatresponse, setChatresponse] = useState(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const fetchChatData = async (location) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/temperature/${location}`);
      setChatresponse(response.data);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  }

  useEffect(() => {
    if (location) {
      fetchChatData(location);
    }
  }, [location]);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-black'} min-h-screen`}>
      <Navbar
        onLocationSearch={handleLocationChange}
        currentLocation={location}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Main Weather Section */}
          <div className="md:col-span-3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <WeatherCard 
                  isDarkMode={isDarkMode} 
                  location={location} 
                  data={weatherData} 
                  className="h-full"
                />
              </div>
              <div>
                <SunMoonSummary 
                  isDarkMode={isDarkMode} 
                  location={location} 
                  className="h-full"
                />
              </div>
              <div className="md:col-span-3">
                <ForecastCard 
                  isDarkMode={isDarkMode} 
                  location={location} 
                />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Statistique 
                  isDarkMode={isDarkMode} 
                  city={location} 
                  data={{cases: 100, deaths: 20, recovered: 80}} 
                />
              </div>
              <div>
                <WeatherRecommendation 
                  isDarkMode={isDarkMode} 
                  location={location} 
                />
              </div>
            </div>
          </div>

          <div className="hidden md:block md:col-span-1">
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;