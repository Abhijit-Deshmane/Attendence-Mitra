"use client";

import MonthSelection from "@/components/MonthSelection";
import React, { useState } from "react";
import GradeSelect from "../students/components/GradeSelect";
import { Button } from "@/components/ui/button";

const Attendence = () => {

  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const onSearchHandeler = ()=>{

}

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Attendance</h2>
      <div className="flex gap-5 my-2 p-5 border rounded-lg shadow-sm ">
        <div className="flex gap-2 items-center">
          <label htmlFor="">Select Month</label>
          <MonthSelection selctedMonth={(value) =>setSelectedMonth(value)} />
        </div>

        <div className="flex gap-2 items-center">
          <label htmlFor="">Select Class</label>
          <GradeSelect />
        </div>
        <Button variant={"blueButton"} 
        onClick = {() => onSearchHandeler()}
        
        >Search</Button>
      </div>
    </div>
  );
};

export default Attendence;
