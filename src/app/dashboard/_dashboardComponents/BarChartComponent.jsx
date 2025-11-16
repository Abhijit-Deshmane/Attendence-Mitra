import React, { useEffect, useState } from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getUniqueRecord } from '../_Services/service';

const BarChartComponent = ({attendenceList,totalPresentData}) => {
  useEffect(()=>{
    formatAttendenceListCount();
  },[attendenceList,totalPresentData])
  const [data,setData] = useState([]); 
   const formatAttendenceListCount = ()=>{
      const totalStudent = getUniqueRecord(attendenceList);
    //   const result = totalPresentData.map((item =>{ 
    //     day:item.day;
    //     presentCount:item.presentCount;
    //     absentCount: Number(totalStudent?.length)-Number(item.presentCount)
    // }))
       const result = totalPresentData.map(item => {
      return {
        name: `Day ${item.day}`,                      // X-Axis Label
        presentCount: Number(item.presentCount),           // Present Count
      absentCount: Number(totalStudent.length) - Number(item.presentCount), // Absent Count
      };
    });
    console.log(result)
    setData(result)
    }
  return (
   
    <div>
        <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}  
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="presentCount" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
      <Bar dataKey="absentCount" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
    </BarChart>
    </div>
  )
}

export default BarChartComponent