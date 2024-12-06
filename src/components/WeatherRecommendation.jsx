import React from "react";

export default function WeatherRecommendation({ meteoOfTheDay, darkMode }) {

    const getClothingRecommendation = () => {
    const { temperature ,condition} = meteoOfTheDay;

    if (temperature <= 32) {
      return {
        primary: "Heavy Winter Coat",
        layers: "Thermal Underwear, Sweater",
        accessories: "Gloves, Scarf, Warm Hat",
        icon: "❄️"
      };
    } else if (temperature <= 50) {
      return {
        primary: "Warm Jacket",
        layers: "Long Sleeve Shirt, Light Sweater",
        accessories: "Light Gloves, Beanie",
        icon: "🧥"
      };
    } else if (temperature <= 65) {
      return {
        primary: "Light Jacket or Hoodie",
        layers: "T-Shirt underneath",
        accessories: "Light Scarf optional",
        icon: "👕"
      };
    } else if (temperature <= 80) {
      return {
        primary: "Short Sleeve Shirt",
        layers: "Light Layer optional",
        accessories: "Sunglasses",
        icon: "👚"
      };
    } else {
      return {
        primary: "Light, Breathable Clothing",
        layers: "Tank Top or Loose Shirt",
        accessories: "Hat, Sunscreen",
        icon: "🩳"
      };
    }
  };

  const recommendation = getClothingRecommendation();

  return (
    <div className={`
      ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
      w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg
      flex flex-col space-y-4
    `}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Today's Weather Recommendation</h2>
        {recommendation.icon}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6" />
          <div>
            <p className="font-semibold">Primary Clothing</p>
            <p>{recommendation.primary}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-6 h-6" />
          <div>
            <p className="font-semibold">Layers</p>
            <p>{recommendation.layers}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-6 h-6" />
          <div>
            <p className="font-semibold">Accessories</p>
            <p>{recommendation.accessories}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm italic">
          Temperature: {meteoOfTheDay.temperature}°F | 
          Condition: {}
        </p>
      </div>

      {meteoOfTheDay.condition.toLowerCase().includes('rain') && (
        <div className="flex items-center space-x-2 text-blue-600">
          <div className="w-5 h-5" />
          <p>Don't forget your umbrella!</p>
        </div>
      )}
    </div>
  );
}