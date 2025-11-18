// "use client"

// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { signIn } from "next-auth/react";

// import { PrismaClient } from "@prisma/client";
// import axios from "axios";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form"

// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner";
// import Link from "next/link";

// const loginSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(5, "Password must be at least 6 characters"),
// })

// export default function LoginForm() {
//   const form = useForm({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       username:"",
//         email: "",      // controlled from the start
//       password: "",
//     },
//   })
// const router = useRouter();
// const prisma = new PrismaClient();
// async function onSubmit(values) {
//     // toast.message("Submitting...");
//   const { username, email, password} = values;
//   !username || !email || !password && toast.error("All fields are required");
// try{
//   // toast.loading("Creating user...",{
//   //       action: {
//   //           label: "Undo",
//   //         },
//   //      });
//   const res = await axios.post("/api/auth/signup", {
//     username, 
//     email, 
//     password
//   })

//       toast.success("User created successfully!",{
//         action: {
//             label: "Undo",
//           },
//        });
//         router.push('/dashboard');
//     }catch(error){
//        toast.error("User already exists.",{
//         action: {
//             label: "Undo",
//           },
//        }); 
//       return Response.json({message:"Error creating user", error: error},{status:500});
//     }
// }


//   return (
//     <div className="flex justify-center items-center h-screen w-screen  ">
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96 bg-white p-6 rounded shadow-2xl dark:bg-gray-800">
//         <h2 className="text-2xl font-bold mb-4 dark:text-white ml-30">Sign Up</h2>
        
         
//         {/* Username */}
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Username</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="Jhon deo" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
        
//         {/* Email */}
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="you@example.com" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Password */}
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input {...field} type="password" placeholder="******" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit"  variant={"blueButton"}  className="w-full dark:bg-blue-500 text-amber-50 text-xl">
//           Sign Up
//         </Button>
//         <div className="flex items-center gap-5">
//           <p>Already Have Account ? </p> 
//           <Link href={"/signin"}>
//           <h3 className="text-xl text-sky-500">Sign in</h3>
//           </Link>
//         </div>
//       </form>
//     </Form>
//     </div>
//   )
// }















// "use client";

// import { PrismaClient } from "@prisma/client";
// import axios from "axios";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const prisma = new PrismaClient();

// export default function SingUpPage() {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     console.log(username,email,password)
//     try{
        
//     const createUser = await axios.post("http://localhost:3000/api/auth/signup", {
//         username,
//         email,
//         password
//     });
//     router.push('/dashboard/sheet');
//     return Response.json({message : "User created", data : user},{status:200})
    
//     }catch(error){
//         return Response.json({message : "error in creating user",Error : error}, {status : 400})
//     }
    
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <div className="mb-4">
//           <label className="block mb-1">Username</label>
//           <input
//             type="String"
//             className="border w-full p-2 rounded"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
           
//         <div className="mb-4">
//           <label className="block mb-1">Email</label>
//           <input
//             type="email"
//             className="border w-full p-2 rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Password</label>
//           <input
//             type="password"
//             className="border w-full p-2 rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }















"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import axios from "axios";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const signupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 6 characters"),
});

export default function SignupForm() {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values) {
    const { username, email, password } = values;

    try {
      // Create user
      const response = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });

      toast.success("Account created successfully!");

      form.reset();

      // Auto Login User
      const loginRes = await signIn("credentials", {
        username,
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        toast.error("Account created, but login failed!");
        return;
      }

      // Now redirect to dashboard
      router.push("/dashboard");

    } catch (error) {
      console.log("Signup error:", error);
      toast.error("User already exists or something went wrong.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-96 bg-white p-6 rounded shadow-2xl dark:bg-gray-800"
        >
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            Sign Up
          </h2>

          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="you@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="******" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={"blueButton"}
            className="w-full dark:bg-blue-500 text-amber-50 text-xl"
          >
            Sign Up
          </Button>

          <div className="flex items-center gap-5">
            <p>Already Have Account?</p>
            <Link href={"/signin"}>
              <h3 className="text-xl text-sky-500">Sign in</h3>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
