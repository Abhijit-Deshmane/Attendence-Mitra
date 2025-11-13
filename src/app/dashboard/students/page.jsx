"use client"

import React, { useEffect, useState } from 'react'
import AddNewStudent from './components/AddNewStudent'
import GlobalApi from '../_Services/GlobalApi'
import StudentListTable from './components/StudentListTable'


const Student = () => {

  const [studentList, setStudentList] = useState([]);

  useEffect(() =>{
    GetAllStudent();
},[])


const GetAllStudent = () => {
  GlobalApi.GetAllStudent().then( res =>{
    setStudentList(res.data);
  }
    
  )
}

  return (
    <div>
      <h2 className='flex justify-between items-center font-bold text-2xl p-4 border'> 
        Students <AddNewStudent/>
      </h2>

      <StudentListTable studentList={studentList}
      refreshData={GetAllStudent}
      />
    </div>
  )
}

export default Student