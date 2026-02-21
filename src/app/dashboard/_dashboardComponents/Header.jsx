"use client";

import React, { useState } from "react";
import Mode from "./ModeChange";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { ChevronDown, LogOut, User } from "lucide-react";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between border p-4 shadow-sm relative bg-white dark:bg-black">
      {/* APP NAME */}
      <h1 className="text-xl font-semibold text-blue-500">Attendence Mitra</h1>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {/* Mode Toggle */}
        <Mode />

        {/* USER PROFILE DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
          >
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                height={32}
                width={32}
                className="rounded-full"
                alt="user"
              />
            ) : (
              <div className="h-[32px] w-[32px] bg-gray-300 rounded-full flex items-center justify-center">
                <User size={18} className="text-gray-700" />
              </div>
            )}
            <ChevronDown size={18} className="text-gray-600" />
          </button>

          {/* DROPDOWN MENU */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border shadow-md rounded-lg p-2 z-50">
              <p className="px-3 py-2 text-sm font-semibold">
                {session?.user?.name}
              </p>
              <p className="px-3 text-xs text-gray-500 mb-2">
                {session?.user?.email}
              </p>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-red-500 hover:bg-red-50 rounded-md"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
