//import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { GraduationCap, Hand, LayoutIcon, Settings } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


async function SideNav() {
    const session = await getServerSession();
//const {name,image,email} = session.user;
    const menuList = [
        {
            id:1,
            name:'Dashboard',
            icon:LayoutIcon,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Students',
            icon:GraduationCap,
            path:'/dashboard/students'
        },
        {
            id:3,
            name:'Attendence',
            icon:Hand,
            path:'/dashboard/attendence'
        },
        {
            id:4,
            name:'Settings',
            icon:Settings,
            path:'/dashboard/settings'
        }
    ]

    return (
        <div className='border shadow-md h-screen p-5'>
            <Image 
            src={'/logo.svg'}
            width={100}
            height={50}
            alt='logo'
            />

            <hr className='my-5'></hr>

        {menuList.map((menu,index)=>(
            <Link href={menu.path}
             key={menu.id}> 
            <h2 className='flex items-center gap-3 text-md p-4
             text-slate-500    
             hover:bg-blue-500
              hover:text-white rounded-lg cursor-pointer
             '>
                <menu.icon/>
                {menu.name}
            </h2>
            </Link>
        ))}


            {/* adding the user logo and name and email with log out functionality
            <div className='flex gap-2 items-center bottom-5 fixed p-4'>
                <Image
                src={image}
                height={35}
                width={35}
                alt='user' className='rounded-full'/>    
            </div>  */}

        </div>
    
    )
}
export default SideNav;