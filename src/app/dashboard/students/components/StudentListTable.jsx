// "use client"
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const StudentListTable = ({studentList}) => {
      const [columnDefs,setColumnDefs] = useState([
    { headerName: "Full Name", field: "fullname", sortable: true, filter: true },
    { headerName: "Class", field: "class", sortable: true, filter: true },
    { headerName: "Roll No", field: "rollNumber", sortable: true, filter: true },
    { headerName: "Contact", field: "contact", sortable: true, filter: true },
  ]);

  const [rowData , setRowData] = useState([{ fullname: "Abhijit", class: "10th A", rollNumber: 23, contact: "9876543210" },
    { fullname: "Riya", class: "10th B", rollNumber: 17, contact: "8765432109" },
]);

  useEffect(() =>{
    studentList && setRowData(studentList);
  },[studentList])
  return (
    <div>
        <div className="ag-theme-alpine" style={{ height:"100%", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
      />
    </div>
    </div>
  )
}

export default StudentListTable;