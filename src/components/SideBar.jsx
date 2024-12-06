import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon 
} from 'lucide-react';


export default function SideBar({ isDarkMode, toggleDarkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`
        transition-all duration-300 ease-in-out
        flex flex-col items-start
        w-64
        shadow-lg
        rounded-xl
        ml-4
      `}
    >
      <div 
        className={`
          w-full overflow-hidden 
          ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
          transition-all duration-300 ease-in-out
        `}
      >
        <h2 
          className={`
            text-xl font-bold p-4 
            ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}
          `}
        >
          Weekly Forecast
        </h2>
        
      </div>
    </div>
  );
}