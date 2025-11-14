"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/dashboard/_Services/GlobalApi";

const GradeSelect = () => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    GetAllClassList();
  }, []);

  const GetAllClassList = async () => {
    try {
      const res = await GlobalApi.GetAllClass();
      setGrades(res.data); 
    } catch (error) {
      console.log("Error getting the classes", error);
    }
  };

  return (
    <div>
      <select name="Class" id="class" className="p-2 rounded-md border">
        {grades.map((item, index) => (
          <option key={index} value={item.class}>
            {item.class}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GradeSelect;
