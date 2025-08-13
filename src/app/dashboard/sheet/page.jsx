"use client"

import Mode from "../_dashboardComponents/modeChange";
import SideNav from "../_dashboardComponents/SideNav";
import { useSession } from "next-auth/react";


export default function sheet() {
  
  const session = useSession();
  

  return (

    <div> {session.status == "authenticated" && <div>
      <Mode />
      <SideNav />
      <h1>hello</h1>
    </div>
       
    
    }</div>
    
  );
}
