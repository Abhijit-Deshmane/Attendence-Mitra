// import React, { useEffect, useState } from "react";
// import { AgGridReact } from "ag-grid-react";
// import moment from "moment";
// import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// import GlobalApi from "../../_Services/GlobalApi";
// import { toast } from "sonner";

// ModuleRegistry.registerModules([AllCommunityModule]);
// const AttendenceGrid = ({ attendenceList, selectedMonth }) => {
//   const [rowData, setRowData] = useState();
//   const [colDefs, setColDefs] = useState([
//     { field: "studentId" },
//     { field: "name" },
//   ]);

//   const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
//   const numberOfDays = daysInMonth(
//     moment(selectedMonth).format("yyyy"),
//     moment(selectedMonth).format("MM")
//   );

//   const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

//   useEffect(() => {
//     if (attendenceList) {
//       const userList = getUniqueRecord();
//       setRowData(userList);
//       daysArray.forEach((date) => {
//         setColDefs((prevData) => [
//           ...prevData,
//           {
//             field: date.toString(),
//             width: 50,
//             editable: true,
//           },
//         ]);
//         userList.forEach((obj) => {
//           obj[date] = isPresent(obj.studentId, date);
//         });
//       });
//     }
//     console.log(attendenceList)
//   }, [attendenceList]);
//   const isPresent = (studentId, day) => {
//     const result = attendenceList.find(
//       (item) => item.day == day && item.studentId == studentId
//     );
//     return result ? true : false;
//   };

//   // used to get the distinct user list
//   const getUniqueRecord = () => {
//     const uniqueRecord = [];
//     const existingUser = new Set();

//     attendenceList?.forEach((record) => {
//       if (!existingUser.has(record.studentId)) {
//         existingUser.add(record.studentId);
//         uniqueRecord.push(record);
//       }
//     });
//     return uniqueRecord;
//   };


//   // used to mark the student attendenc
//   const date = moment(selectedMonth).format("MM/yyyy");
//   const onMarkAttendence = (day, studentId, presentstatus) => {
//     if (presentstatus) {
//       const data = {
//         day: day,
//         studentId: studentId,
//         present: presentstatus,
//         date: date,
//       };

//       GlobalApi.MarkAttendence(data).then((res) => {
//         console.log(res);
//         toast("Student ID : " +  studentId  + " Marked as Present");
//       });
//     }
//     else{
//       GlobalApi.MarkAbsent(studentId,day,date).then(res=>{
//          toast("Student ID : " +  studentId  + " Marked as Absent");
//       })
//     }
//   };

//   return (
//     <div>
//       <div style={{ height: 500 }}>
//         <AgGridReact
//           rowData={rowData}
//           columnDefs={colDefs}
//           onCellValueChanged={(e) => {
//             onMarkAttendence(e.colDef.field, e.data.studentId, e.newValue);
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default AttendenceGrid;


















// import React, { useEffect, useState } from "react";
// import { AgGridReact } from "ag-grid-react";
// import moment from "moment";
// import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// import GlobalApi from "../../_Services/GlobalApi";
// import { toast } from "sonner";

// ModuleRegistry.registerModules([AllCommunityModule]);

// const AttendenceGrid = ({ attendenceList, selectedMonth }) => {
//   const [rowData, setRowData] = useState([]);
//   const [colDefs, setColDefs] = useState([
//     { field: "studentId" },
//     { field: "name" },
//   ]);

//   const numberOfDays = moment(selectedMonth).daysInMonth();
//   const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

//   const isPresent = (studentId, day) => {
//     const student = attendenceList.find(
//       (s) => s.studentId === studentId
//     );

//     if (!student || !student.attendance) return false;

//     const match = student.attendance.find((a) => a.day === day);

//     return match ? match.present : false;
//   };

//   useEffect(() => {
//     if (!attendenceList || attendenceList.length === 0) return;

//     // 1. Build column definitions
//     const dayCols = daysArray.map((d) => ({
//       field: d.toString(),
//       width: 50,
//       editable: true,
//     }));

//     setColDefs([
//       { field: "studentId" },
//       { field: "name" },
//       ...dayCols,
//     ]);

//     // 2. Build row data
//     const rows = attendenceList.map((student) => {
//       const row = {
//         studentId: student.studentId,
//         name: student.name,
//       };

//       daysArray.forEach((day) => {
//         row[day] = isPresent(student.studentId, day);
//       });

//       return row;
//     });

//     setRowData(rows);
//   }, [attendenceList]);

//   const date = moment(selectedMonth).format("MM/yyyy");

//   const onMarkAttendence = (day, studentId, presentstatus) => {
//     if (presentstatus) {
//       const data = { day, studentId, present: presentstatus, date };
//       GlobalApi.MarkAttendence(data).then(() =>
//         toast(`Student ID: ${studentId} marked Present`)
//       );
//     } else {
//       GlobalApi.MarkAbsent(studentId, day, date).then(() =>
//         toast(`Student ID: ${studentId} marked Absent`)
//       );
//     }
//   };

//   return (
//     <div>
//       <div style={{ height: 500 }}>
//         <AgGridReact
//           rowData={rowData}
//           columnDefs={colDefs}
//           onCellValueChanged={(e) =>
//             onMarkAttendence(
//               Number(e.colDef.field),
//               e.data.studentId,
//               e.newValue
//             )
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default AttendenceGrid;









import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import GlobalApi from "../../_Services/GlobalApi";
import { toast } from "sonner";


ModuleRegistry.registerModules([AllCommunityModule]);


const paginationPageSize =10;
const paginationPageSizeSelector = [10,25, 50, 100];

const AttendanceGrid = ({ attendenceList, selectedMonth }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

  useEffect(() => {
    if (!attendenceList || attendenceList.length === 0) return;

    const month = moment(selectedMonth).format("MM");
    const year = moment(selectedMonth).format("YYYY");
    const daysInMonth = new Date(Number(year), Number(month), 0).getDate();

    // -------------------------------
    // 1️⃣ Build Fixed Columns
    // -------------------------------
    const columns = [
      { headerName: "Roll No", field: "rollNumber", width: 100, filter:true},
      { headerName: "Name", field: "name", width: 140, filter:true},
    ];

    // -------------------------------
    // 2️⃣ Add Dynamic Day Columns
    // -------------------------------
    for (let day = 1; day <= daysInMonth; day++) {
      columns.push({
        headerName: day.toString(),
        field: day.toString(),
        width: 50,
        editable: true,
        cellStyle: { textAlign: "center" },
      });
    }

    setColDefs(columns);

    // -------------------------------
    // 3️⃣ Row Data Already Has Day Values
    // -------------------------------
    setRowData(attendenceList);
  }, [attendenceList]);

  // -------------------------------
  // 🔥 Marking Attendance
  // -------------------------------
  const markAttendance = (day, studentId, present,rollNumber) => {
    const date = moment(selectedMonth).format("MM/YYYY");

    if (present) {
      GlobalApi.MarkAttendence({
        day,
        studentId,
        present: true,
        date,
      }).then(() => {
        toast(`Student ${rollNumber} marked Present`);
      });
    } else {
      GlobalApi.MarkAbsent(studentId, day, date).then(() => {
        toast(`Student ${rollNumber} marked Absent`);
      });
    }
  };

  return (
    <div style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={(e) => {
          const day = Number(e.colDef.field); // 1–31
          if (!day || isNaN(day)) return;

          markAttendance(day, e.data.studentId, e.newValue,e.data.rollNumber);
        }}

        pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </div>
  );
};

export default AttendanceGrid;
