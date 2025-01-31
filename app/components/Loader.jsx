import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#fdf5e9]">
      <img src="/images/launch.png" alt="Logo" className="h-16 animate-pulse" />
    </div>
  );
}

export default Loader;
