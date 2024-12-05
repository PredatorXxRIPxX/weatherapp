import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <div className="text-xl font-bold">SkyCast</div>
      <input
        type="text"
        placeholder="Search Location"
        className="px-4 py-2 border rounded"
      />
      <button className="p-2 border rounded">Light</button>
    </nav>
  );
};

export default Navbar;
