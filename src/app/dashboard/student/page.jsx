"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email : z.string().email("Invalid email address"),
  passowrd : z.string().min(6, {
    message : "password must be at least 6 characters.",
  })
})

export function StudentPage() {

const form = useForm({
    resolver : zodResolver(formSchema),
    defaultValues : {
        username : "",
        email : "",
        passowrd : "",
    }
});


const onSubmit =  (data) => {
    console.log("Form submitted with data:");
    
    
}





    // ...

  return (

    <div className="h-auto w-auto flex-col items-center justify-center  ">




    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Ex. Jhon deo" {...field} ochange ={(e) => {
                    field.ochange(e)
                }} />
              </FormControl>  
              <FormMessage />
            </FormItem>
          )}
          />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Ex. Jhondeo@gmail.com" type={"email"} {...field} ochange ={(e) => {
                    field.ochange(e)
                }} />
              </FormControl>  
              <FormMessage />
            </FormItem>
          )}
          />

          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type={"passowrd"} {...field} ochange ={(e) => {
                    field.ochange(e)
                }} />
              </FormControl>  
              <FormMessage />
            </FormItem>
          )}
          />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
</div>
  )
}



export default StudentPage;