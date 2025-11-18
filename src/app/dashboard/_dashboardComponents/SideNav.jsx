// //import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// "use client"
// import { GraduationCap, Hand, LayoutIcon, Settings } from 'lucide-react';
// import { getServerSession } from 'next-auth';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useEffect } from 'react';


// function SideNav() {
//     // const session = await getServerSession();
// //const {name,image,email} = session.user;

//     const path = usePathname();
//     useEffect(() =>{
//         console.log(path);
//     },[path])
//     const menuList = [
//         {
//             id:1,
//             name:'Dashboard',
//             icon:LayoutIcon,
//             path:'/dashboard'
//         },
//         {
//             id:2,
//             name:'Students',
//             icon:GraduationCap,
//             path:'/dashboard/students'
//         },
//         {
//             id:3,
//             name:'Attendence',
//             icon:Hand,
//             path:'/dashboard/attendence'
//         },
//         // {
//         //     id:4,
//         //     name:'Settings',
//         //     icon:Settings,
//         //     path:'/dashboard/settings'
//         // }
//     ]

//     return (
//         <div className='border shadow-md h-screen p-5'>
//             <Image 
//             src={'/logo.svg'}
//             width={100}
//             height={50}
//             alt='logo'
//             />

//             <hr className='my-5'></hr>

//         {menuList.map((menu,index)=>(
//             <Link href={menu.path}
//              key={menu.id}> 
//         <h2 className={`flex items-center gap-3 text-md p-4
//              text-slate-500    
//              hover:bg-blue-500
//               hover:text-white rounded-lg cursor-pointer
//               ${path == menu.path && 'bg-blue-500 text-white'}
//               `}>
//                 <menu.icon/>
//                 {menu.name}
//             </h2>
//             </Link>
//         ))}


//             {/* adding the user logo and name and email with log out functionality
//             <div className='flex gap-2 items-center bottom-5 fixed p-4'>
//                 <Image
//                 src={image}
//                 height={35}
//                 width={35}
//                 alt='user' className='rounded-full'/>    
//             </div>  */}

//         </div>
    
//     )
// }
// export default SideNav;










"use client";

import {
  GraduationCap,
  Hand,
  LayoutIcon,
  LogOut,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function SideNav() {
  const path = usePathname();
  const { data: session } = useSession();

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendence",
    },
  ];

  return (
    <div className="border shadow-md h-screen p-5 flex flex-col justify-between">
      {/* LOGO */}
      <div>
        <Image src="/logo.svg" width={100} height={50} alt="logo" />
        <hr className="my-5" />

        {/* MENU ITEMS */}
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`flex items-center gap-3 text-md p-4 text-slate-600 
              hover:bg-blue-500 hover:text-white rounded-lg cursor-pointer
              ${
                path === menu.path ? "bg-blue-500 text-white shadow-md" : ""
              }`}
            >
              <menu.icon className="w-5 h-5" />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* USER PROFILE + LOGOUT */}
      <div className="border-t pt-4">
        <div className="flex items-center gap-3">
          {/* User Image */}
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              height={40}
              width={40}
              alt="user"
              className="rounded-full"
            />
          ) : (
            <div className="h-[40px] w-[40px] rounded-full bg-gray-200 flex items-center justify-center">
              <UserRound className="text-gray-600" />
            </div>
          )}

          {/* Name + Email */}
          <div>
            <h2 className="text-sm font-semibold">{session?.user?.name}</h2>
            <p className="text-xs text-slate-500">{session?.user?.email}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-4 w-full flex items-center gap-2 px-4 py-2 bg-red-500 text-white 
                     rounded-lg hover:bg-red-600 transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}
