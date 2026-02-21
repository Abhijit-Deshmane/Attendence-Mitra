"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ModeChange() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === "dark" ? (
        <button onClick={() => setTheme("light")}>
          <Sun />
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <Moon />
        </button>
      )}
    </>
  );
}

export default ModeChange;
