import { ThemeProvider } from "@/app/ThemeProvider";

import Header from "./_dashboardComponents/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SideNav from "./_dashboardComponents/SideNav";

export default async function RootLayout({ children }) {
 // const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect("/auth/signin"); // redirect to login if not authenticated
  // }

  return (

    <div>
      <div className="md:w-64 fixed hidden md:block">
        <SideNav/>
      </div>
      <div className="md:ml-64">
        <Header/>
        {children}
      </div>
    </div>




    // <div className="flex min-h-screen flex-col">
    //   <header className="bg-green-600 text-white p-4">Dashboard Header</header>
    //   <main className="flex-1 p-4">{children}</main>
    // </div>

    // <html lang="en" suppressHydrationWarning >
    //   <head />
    //   <body>
    //     <>
    //              {children}
    //     </>

    //   </body>
    // </html>
  );
}
