import React from "react";

const ForecastCard = () => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="text-lg">Tomorrow</div>
      <ul className="mt-4">
        <li className="flex justify-between">
          <span>1AM</span>
          <span>Mostly Cloudy</span>
        </li>
      </ul>
    </div>
  );
};

export default ForecastCard;
