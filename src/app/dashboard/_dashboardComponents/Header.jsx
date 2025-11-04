import React from "react";
import Mode from "./modeChange";
function Header() {
  return (
    <div className='flex items-center justify-between border p-4 shadow-sm'>
      <div>
          <h1>Attendence Mitra</h1>
      </div>
     
      <div>
        <Mode />
      </div>
    </div>
  );
}

export default Header;
