import React from "react";
import Mode from "./modeChange";
function Header() {
  return (
    <div className="flex items-center justify-between h-20 w-full">
      {" "}
      <h1>Attendence Mitra</h1>
      <div>
        <Mode />
      </div>
    </div>
  );
}

export default Header;
