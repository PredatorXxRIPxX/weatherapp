import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
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
          transition-all duration-300 ease-in-out
          p-4
        `}
      >
        <div className={`${isDarkMode?'text-white':'text-black'} font-medium text-2xl text-center`}>
            Weekly records
        </div>
        
        
      </div>
    </div>
  );
}