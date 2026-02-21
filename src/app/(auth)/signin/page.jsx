"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";

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

const loginSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
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
      const res = await signIn("credentials", {
        username,
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("User logged in successfully!");
      router.push("/dashboard");

    } catch (error) {
      console.log("Login error:", error);
      toast.error("Something went wrong!");
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
            Sign In
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
            Sign In
          </Button>

          <div className="flex items-center gap-5">
            <p>Do Not Have Account?</p>
            <Link href={"/signup"}>
              <h3 className="text-xl text-sky-500">Sign up</h3>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
