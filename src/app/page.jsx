import Image from "next/image";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants/navLinks";
import Link from "next/link";
import { Check } from "lucide-react";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <nav className="border-b-2 w-full h-20  flex justify-between items-center ">
        <h1 className="text-4xl pl-4 text-blue-600 ml-8">Attendence Mitra</h1>
        <div>
          {navLinks.map((link, index) => (
            <Link
              className="px-5.5 font-semibold text-xl font-mono  hover:text-blue-500"
              key={index}
              href={link.href}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className="mr-10">
          <Link key={"1"} href={"/signin"}>
            {" "}
            <Button variant="blueButton" className={"mr-2.5"}>
              sign in{" "}
            </Button>{" "}
          </Link>
          <Link key={"2"} href={"/signup"}>
            <Button variant="blueButton" className={"mr-3.5"}>
              sign up{" "}
            </Button>
          </Link>
        </div>
      </nav>
      <div className="flex justify-between w-full h-[calc(100vh-80px)] ">
        <div className="w-[50%] h-full ">
          <h1 className="text-5xl mt-28 ml-12 ">
            Best <span className="text-blue-500 font-serif ">Student</span>
            <br /> Attendence Platform <br />{" "}
            <span className="text-blue-400 font-serif">In The World</span> . . .
            .{" "}
          </h1>
          <p className="mt-7 ml-12 font-light text-xl">
            We provide the most efficent and featurefull <br /> web appllication
            for student attendence with seamless experince
          </p>
          <p className="mt-7 ml-12 font-light text-xl">
            To get started please Sign in . . . . .
          </p>
          <br />
          <br />
          <span className="ml-38">
            <Link key={"2"} href={"/signup"}>
            <Button variant="blueButton">
             GET  STARTED
            </Button>
            </Link>
          </span>
        </div>
        <div className="w-[50%] h-full flex relative">
          <div className="w-[300px] h-[350px] relative mt-64 ml-16">
            <Image
              src="/herosection1.jpg"
              alt="hero image"
              width={100}
              height={50}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div className="w-[300px] h-[350px] relative ml-16 mt-[70px] ">
            <Image
              src="/herosection2.jpg"
              alt="hero image"
              width={100}
              height={50}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="border w-auto bg-blue-500 p-2.5 h-auto ml-80 rounded-md  mt-[420px] absolute">
            <h1 className="flex gap-2.5 font-semibold text-xl text-white">
              {" "}
              <Check /> Get Exclusive features{" "}
            </h1>
            <h1 className="flex gap-2.5 font-semibold text-xl text-white">
              {" "}
              <Check /> Get free access to every <br /> features{" "}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
