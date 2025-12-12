"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/dashboard/_Services/GlobalApi";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const AddNewStudent = ({refreshData}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    GetAllClassList();
  }, []);

  const GetAllClassList = async () => {
    try {
      const res = await GlobalApi.GetAllClass();
      setGrades(res.data); // storing data correctly
    } catch (error) {
      console.log("Error getting the classes", error);
    }
  };

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    try {
      GlobalApi.CreateNewStudent(data).then((res) => {
        // console.log(res);
        if (res.data) {
          reset();
          refreshData();
          setOpen(false);
          toast("New Student Added !");
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      toast("Error while creating the New Student !");
    }
  };

  return (
    <div>
      <Button variant={"blueButton"} onClick={() => setOpen(true)}>
        + Add New Student
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student </DialogTitle>
            <DialogDescription></DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-3">
                <label htmlFor="fullName">FullName</label>
                <Input
                  {...register("fullName", { required: true })}
                  placeholder="Enter full Name Ex. Akshay Deshmane"
                />
              </div>
              <div className="p-3">
                <label htmlFor="contact">Contact</label>
                <Input
                  {...register("contact")}
                  placeholder="Ex. +91 xxxxxxxx90"
                  type={"number"}
                />
              </div>
              <div className="flex flex-col p-3">
                <label htmlFor="class">Class</label>
                {/* add the options by fetching the class tabel from db */}
                <select
                  name="Class"
                  id="class"
                  className="p-2 rounded-md border"
                  {...register("class", { required: true })}
                >
                  {grades.map((item, index) => (
                    <option key={index} value={item.class}>
                      {item.class}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-3">
                <label htmlFor="rollNumber">Roll Number</label>
                <Input
                  {...register("rollNumber", { required: true })}
                  placeholder="Ex. xx"
                  type="number"
                />
              </div>
              <div className="flex gap-2.5 justify-end items-center border">
                <Button onClick={() => setOpen(false)}>Close</Button>
                <Button type="Submit" variant={"blueButton"}>
                  {loading ? <LoaderIcon className="animate-spin" /> : "Submit"}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStudent;
