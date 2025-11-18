"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signIn } from "next-auth/react";

import { PrismaClient } from "@prisma/client";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner";

const loginSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 6 characters"),
})

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username:"",
        email: "",      // controlled from the start
      password: "",
    },
  })
const router = useRouter();
const prisma = new PrismaClient();
async function onSubmit(values) {
    // toast.message("Submitting...");
  const { username, email, password} = values;
  !username || !email || !password && toast.error("All fields are required");
try{
  // toast.loading("Creating user...",{
  //       action: {
  //           label: "Undo",
  //         },
  //      });
  const res = await axios.post("/api/auth/signup", {
    username, 
    email, 
    password
  })

      toast.success("User created successfully!",{
        action: {
            label: "Undo",
          },
       });
        router.push('/dashboard');
    }catch(error){
       toast.error("User already exists.",{
        action: {
            label: "Undo",
          },
       }); 
      return Response.json({message:"Error creating user", error: error},{status:500});
    }
}


  return (
    <div className="flex justify-center items-center h-screen w-screen  ">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96 bg-white p-6 rounded shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 dark:text-white ml-30">Sign Up</h2>
        
         
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Jhon deo" />
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

        <Button type="submit" className="w-full dark:bg-blue-500 text-amber-50 text-xl">
          Sign Up
        </Button>
      </form>
    </Form>
    </div>
  )
}
