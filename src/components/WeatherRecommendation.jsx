import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherRecommendation({ location, isDarkMode }) {
  const [chatResponse, setChatResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChatData = async (location) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/temperature/${location}`);
      // Checking if suggestion exists and is an array before joining
      const suggestion = response.data.suggestion 
        ? Array.isArray(response.data.suggestion)
          ? response.data.suggestion.join(' ')
          : response.data.suggestion
        : "No recommendation available.";
      
      setChatResponse(suggestion);
    } catch (error) {
      console.error('Error fetching chat data:', error);
      setError('Failed to fetch weather recommendation');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchChatData(location);
    }
  }, [location]);

  return (
    <div className={`
      ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
      w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg
      flex flex-col space-y-4 mt-3 h-full
    `}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Today's Weather Recommendation</h2>
      </div>
      <div>
        {isLoading ? (
          <p className="text-gray-500">Loading recommendation...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          chatResponse || "No recommendation available."
        )}
      </div>
    </div>
  );
}