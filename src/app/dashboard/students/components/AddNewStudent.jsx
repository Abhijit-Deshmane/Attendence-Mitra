"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { useForm } from "react-hook-form"
import { number } from 'zod'


const AddNewStudent = () => {
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

    const[open,setOpen] = useState(false);
    const onSubmit = (data)=>{
        console.log("submit",data);
    }
  return (
    <div> 
        <Button variant={"blueButton"} onClick = {() => setOpen(true)}>+ Add New Student</Button>
        <Dialog open = {open}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add New Student </DialogTitle>
                <DialogDescription>  
                </DialogDescription>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='p-3'>
                        <label htmlFor="FullName">Full Name</label>
                        <Input  {...register("FullName", { required: true })} placeholder = "Enter full Name Ex. Akshay Deshmane"/>
                    </div>
                    <div className='p-3'>
                        <label htmlFor="Contact">Contact</label>
                        <Input {...register("Contact")} placeholder = "Ex. +91 xxxxxxxx90" type="number"/>
                    </div>
                    <div className='flex flex-col p-3'>
                        <label htmlFor="Class">Class</label>
                       <select {...register("Class",{ required: true })} name="Class" id="class" className='p-2 rounded-md border'>
                            <option value="FY">FY</option>
                            <option value="SY">SY</option>
                            <option value="TY">TY</option>
                            <option value="FE">FE</option>
                        </select>
                    </div>
                    <div className='p-3'>
                        <label htmlFor="RollNumber">Roll Number</label>
                        <Input {...register("RollNumber",{ required: true })} placeholder = "Ex. xx" type="number"/>
                    </div>
                    <div className='flex gap-2.5 justify-end items-center border'>
                        <Button onClick={()=>setOpen(false)}>Close</Button>
                        <Button type="Submit" variant={"blueButton"}>Submit</Button>
                    </div>
                  
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddNewStudent