import { ThemeProvider } from "@/app/ThemeProvider";

import Header from "./_dashboardComponents/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SideNav from "./_dashboardComponents/SideNav";

export default async function RootLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 fixed hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
}
