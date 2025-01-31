import React from "react";

function Header() {
  return (
    <div>
      <div className="absolute top-6 left-6">
        <img src="/images/menu.png" alt="Logo" className="h-12" />
      </div>

      <div className="absolute top-20 left-0 w-full">
        <hr className="border-t-1 border-gray-300" />
      </div>
    </div>
  );
}

export default Header;
