"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function modeChange() {
  const {theme, setTheme} = useTheme("");

  

  return (
    <>
      {" "}
      {theme == "dark" ? (
        <div>
          <button
            onClick={() => {
              setTheme("light");
            }}
          >
            {" "}
            <Sun />{" "}
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setTheme("dark");
            }}
          >
            {" "}
            <Moon />{" "}
          </button>
        </div>
      )}
    </>
  );
}

export default modeChange;
