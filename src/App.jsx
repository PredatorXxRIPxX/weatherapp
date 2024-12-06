import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import SunMoonSummary from "./components/SunMoonSummary";
import "./index.css";
import WeatherRecommendation from "./components/WeatherRecommendation";
import SideBar from "./components/SideBar";
import Statistique from "./components/Statistique";

function App() {
  const [location, setLocation] = useState("New York");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode?'bg-slate-900':'bg-white'} h-full`}>

      <Navbar
        onLocationSearch={handleLocationChange}
        currentLocation={location}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="container mx-auto h-full rounded-xl  flex p-4 ">
          <div className=" w-4/5">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-2 h-full ">
                <WeatherCard isDarkMode={isDarkMode} location={location} />
              </div>
              <div className="col-span-1">
                <SunMoonSummary isDarkMode={isDarkMode} location={location} />
                <button className="bg-blue-500 text-white p-2 rounded-lg w-full mt-4  hover:scale-105 transition-all ease-in-out duration-300 ">Ajouter une ville</button>
              </div>
              <ForecastCard isDarkMode={isDarkMode} location={location} />
            </div>
            <div className="w-full grid gap-2 grid-cols-6">
              <div className=" col-span-4">
                <Statistique isDarkMode={isDarkMode} city={location} data={{cases: 100, deaths: 20, recovered: 80}} />
              </div>
              <div className=" col-span-2">
                <WeatherRecommendation isDarkMode={isDarkMode} meteoOfTheDay={{temperature:32 , condition: "hello"}} />
              </div>
            </div>
          </div>
          <SideBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>

    </div>
  );
}

export default App;
