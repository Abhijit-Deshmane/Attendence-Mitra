"use client";

import MonthSelection from "@/components/MonthSelection";
import React, { useState } from "react";
import GradeSelect from "../../../components/GradeSelect";
import { Button } from "@/components/ui/button";
import GlobalApi from "../_Services/GlobalApi";
import moment from "moment";
import AttendenceGrid from "./_components/AttendenceGrid";

const Attendence = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendenceList, setAttendenceList] = useState();

  // used to fetch the attendence list for given month and class
  const onSearchHandeler = () => {
    const month = moment(selectedMonth).format("MM/YYYY");

    GlobalApi.GetAttandenceList(selectedGrade, month).then((res) => {
      setAttendenceList(res.data);
    });
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Attendance</h2>
      <div className="flex gap-5 my-2 p-5 border rounded-lg shadow-sm ">
        <div className="flex gap-2 items-center">
          <label htmlFor="">Select Month</label>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
        </div>

        <div className="flex gap-2 items-center">
          <label htmlFor="">Select Class</label>
          <GradeSelect selectedGrade={(value) => setSelectedGrade(value)} />
        </div>
        <Button variant={"blueButton"} onClick={() => onSearchHandeler()}>
          Search
        </Button>
      </div>

      {/* Student Attendence Grid */}
      <AttendenceGrid
        attendenceList={attendenceList}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default Attendence;
