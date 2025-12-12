import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import GlobalApi from "../../_Services/GlobalApi";
import { toast } from "sonner";

ModuleRegistry.registerModules([AllCommunityModule]);

const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 25, 50, 100];

const AttendanceGrid = ({ attendenceList, selectedMonth }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

  useEffect(() => {
    if (!attendenceList || attendenceList.length === 0) return;

    const month = moment(selectedMonth).format("MM");
    const year = moment(selectedMonth).format("YYYY");
    const daysInMonth = new Date(Number(year), Number(month), 0).getDate();

    // -------------------------------
    // 1️ Build Fixed Columns
    // -------------------------------
    const columns = [
      { headerName: "Roll No", field: "rollNumber", width: 100, filter: true },
      { headerName: "Name", field: "name", width: 140, filter: true },
    ];

    // -------------------------------
    // 2️ Add Dynamic Day Columns
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
    // 3️ Row Data Already Has Day Values
    // -------------------------------
    setRowData(attendenceList);
  }, [attendenceList]);

  // -------------------------------
  //  Marking Attendance
  // -------------------------------
  const markAttendance = (day, studentId, present, rollNumber) => {
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

          markAttendance(day, e.data.studentId, e.newValue, e.data.rollNumber);
        }}
        pagination={true}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </div>
  );
};

export default AttendanceGrid;
