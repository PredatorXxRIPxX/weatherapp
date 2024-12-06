import React, { useState } from "react";
import { Search, Sun, Moon } from "lucide-react";

const Navbar = ({
  onLocationSearch,
  currentLocation,
  isDarkMode,
  toggleDarkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState(currentLocation);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onLocationSearch(searchQuery);
    }
  };

  return (
    <>
      <nav
        className={`
      sticky top-0 z-50 
      ${
        isDarkMode
          ? "bg-gray-800/60 text-gray-100"
          : "bg-white/80 text-gray-900"
      }
      backdrop-blur-md shadow-md rounded-xl  m-5
    `}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div
                className={`
            text-2xl font-bold 
            ${isDarkMode ? "text-blue-300" : "text-blue-600"}
          `}
              >
                Nuit d'info
              </div>
            </div>

            <form onSubmit={handleSearch} className="flex-grow max-w-md mx-4 ">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Location"
                  className={`
                  w-full pl-10 pr-4 py-2 
                  ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-500"
                      : "bg-white border-gray-300 focus:ring-blue-500"
                  }
                  border rounded-full focus:outline-none focus:ring-2 transition-all
                `}
                />
                <Search
                  className={`
                  absolute left-3 top-1/2 transform -translate-y-1/2 
                  ${isDarkMode ? "text-gray-400" : "text-gray-400"}
                `}
                  size={20}
                />
              </div>
            </form>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className={`
              p-2 rounded-full hover:bg-opacity-20 transition-colors
              ${
                isDarkMode
                  ? "hover:bg-white text-yellow-300"
                  : "hover:bg-black text-gray-700"
              }
            `}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
