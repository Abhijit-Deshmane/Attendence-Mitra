// import React, { useEffect, useState } from 'react'
// import { getUniqueRecord } from '../_Services/service';
// import moment from 'moment';

// const  StatusList = ({attendenceList}) => {
//     const [totalStudent,setTotalStudent] = useState(0);
//         const [prsentPercentage,setPresentPercentage] = useState(0);
//     useEffect(()=>{
//         if(attendenceList){
//             const totalSt = getUniqueRecord(attendenceList);
//             setTotalStudent(totalSt);
//             const today = moment().format('D');
//             console.log(totalSt);

//             const presentPerc = (attendenceList.length/(totalSt.length*Number(today))*100);
//             console.log(presentPerc)
//         }
//     },[attendenceList])

//  return (
//     <div>StatusList</div>
//   )
// }

// export default StatusList



import React, { useEffect, useState } from 'react'
import { getUniqueRecord } from '../_Services/service';
import moment from 'moment';
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

const StatusList = ({ attendenceList }) => {

  const [totalStudent, setTotalStudent] = useState(0);
  const [presentPercentage, setPresentPercentage] = useState(0);

//   useEffect(() => {
//     if (attendenceList && attendenceList.length > 0) {

//       // Get unique students
//       const uniqueStudents = getUniqueRecord(attendenceList);
//       setTotalStudent(uniqueStudents.length);
//       console.log(uniqueStudents)

//       // Today's date (1–31)
//       const today = Number(moment().format('D'));

//       // Total expected attendance entries = unique students × days passed
//       const expected = uniqueStudents.length * today;

//       // Avoid divide-by-zero
//       if (expected > 0) {
//         const percentage = (attendenceList.length / expected) * 100;
//         setPresentPercentage(percentage.toFixed(2));
//       }
//     }
//   }, [attendenceList]);

// useEffect(() => {
//   if (!attendenceList || attendenceList.length === 0) return;

//   const uniqueStudents = getUniqueRecord(attendenceList);
//   setTotalStudent(uniqueStudents.length);
//    console.log(uniqueStudents)

//   // total present entries
//   let totalPresent = 0;
//   uniqueStudents.forEach(s => {
//     totalPresent += s.attendance.length;
//   });

//   const totalPossible = uniqueStudents.length * 30; // because days 1–30 exist

//   const percentage = (totalPresent / totalPossible) * 100;
//   setPresentPercentage(percentage.toFixed(2));

// }, [attendenceList]);


//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
//      <Card  icon={<GraduationCap/>} title="Total Student" value={totalStudent}/>
//      <Card  icon={<TrendingUp/>} title="Total % Present" value={(presentPercentage).toFixed(1) + "%"}/>
//      <Card  icon={<TrendingDown/>} title="Total % Absent" value={(100-presentPercentage).toFixed(1) + "%"}/>
//     </div>
//   );
// };

// export default StatusList;







useEffect(() => {
    if (!attendenceList || attendenceList.length === 0) return;

    const uniqueStudents = getUniqueRecord(attendenceList);
    setTotalStudent(uniqueStudents.length);

    // total present entries
    let totalPresent = 0;
    uniqueStudents.forEach(s => {
      totalPresent += s.attendance.length;
    });

    // assuming 30 days available in your object
    const totalPossible = uniqueStudents.length * 30;

    const percentage = (totalPresent / totalPossible) * 100;

    // FIX: store as number, NOT string
    setPresentPercentage(Number(percentage.toFixed(2)));

  }, [attendenceList]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      <Card 
        icon={<GraduationCap />} 
        title="Total Student" 
        value={totalStudent} 
      />

      <Card 
        icon={<TrendingUp />} 
        title="Total Present" 
        value={`${presentPercentage.toFixed(1)}%`} 
      />

      <Card
        icon={<TrendingDown />}
        title="Total Absent"
        value={`${(100 - presentPercentage).toFixed(1)}%`}
      />
    </div>
  );
};

export default StatusList;
