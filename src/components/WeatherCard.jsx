import React from "react";

const WeatherCard = () => {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <div className="text-lg">Current Weather</div>
      <h1 className="text-4xl font-bold">12°</h1>
      <p>Rainy, Feels like 35°</p>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>Air Quality: 156</div>
        <div>Wind: 1 mph</div>
        <div>Humidity: 54%</div>
        <div>Visibility: 3 mi</div>
        <div>Pressure: 27.65 in</div>
      </div>
    </div>
  );
};

export default WeatherCard;
