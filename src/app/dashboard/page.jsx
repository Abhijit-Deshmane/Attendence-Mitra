"use client"
import GradeSelect from '@/components/GradeSelect';
import MonthSelection from '@/components/MonthSelection'
import React, { useEffect, useState } from 'react'
import GlobalApi from './_Services/GlobalApi';
import moment from 'moment';
import StatusList from './_dashboardComponents/StatusList';
import BarChart from './_dashboardComponents/BarChartComponent';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendenceList, setAttendenceList] = useState();
  const [totalPresentData,setTotalPresentData] = useState([]);
useEffect(()=>{
  getStudentAttendence();
  getTotalPresentCountByDay();
},[selectedMonth , selectedGrade])


// used to get the student attendence form db
  const getStudentAttendence = ()=>{
    GlobalApi.GetAttandenceList(selectedGrade, moment(selectedMonth).format('MM/yyyy')).then(res =>{
      setAttendenceList(res.data)
    })
  }

  const getTotalPresentCountByDay = ()=>{
    GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format('MM/yyyy'), selectedGrade).then(res =>{
      setTotalPresentData(res.data)
    })
  }
  return (
    <div className='p-10'>  
     <div className='flex justify-between items-center'>
       <h2 className='font-bold text-2xl'>Dashboard</h2>

      <div className='flex items-center gap-4'>
        <MonthSelection selectedMonth={setSelectedMonth}/>
        <GradeSelect selectedGrade={setSelectedGrade}/>
      </div>
       </div>
      <StatusList attendenceList={attendenceList}/>
    <div className='grid grid-cols-1 md:grid-cols-3'>
      <div  className='md:col-span-2'>
        <BarChart attendenceList={attendenceList} totalPresentData={totalPresentData} />
      </div>
    </div>
    </div>
  )
}

export default Dashboard