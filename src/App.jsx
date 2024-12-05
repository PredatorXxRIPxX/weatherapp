import React from "react";
import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import SunMoonSummary from "./components/SunMoonSummary";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherCard />
        <ForecastCard />
        <SunMoonSummary />
      </div>
    </div>
  );
}

export default App;
