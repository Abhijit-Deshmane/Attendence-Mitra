import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import GlobalApi from "../../_Services/GlobalApi";
import { toast } from "sonner";

ModuleRegistry.registerModules([AllCommunityModule]);
const AttendenceGrid = ({ attendenceList, selectedMonth }) => {
  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState([
    { field: "studentId" },
    { field: "name" },
  ]);

  const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const numberOfDays = daysInMonth(
    moment(selectedMonth).format("yyyy"),
    moment(selectedMonth).format("MM")
  );

  const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  useEffect(() => {
    if (attendenceList) {
      const userList = getUniqueRecord();
      setRowData(userList);
      daysArray.forEach((date) => {
        setColDefs((prevData) => [
          ...prevData,
          {
            field: date.toString(),
            width: 50,
            editable: true,
          },
        ]);
        userList.forEach((obj) => {
          obj[date] = isPresent(obj.studentId, date);
        });
      });
    }
  }, [attendenceList]);
  const isPresent = (studentId, day) => {
    const result = attendenceList.find(
      (item) => item.day == day && item.studentId == studentId
    );
    return result ? true : false;
  };

  // used to get the distinct user list
  const getUniqueRecord = () => {
    const uniqueRecord = [];
    const existingUser = new Set();

    attendenceList?.forEach((record) => {
      if (!existingUser.has(record.studentId)) {
        existingUser.add(record.studentId);
        uniqueRecord.push(record);
      }
    });
    return uniqueRecord;
  };


  // used to mark the student attendenc
  const date = moment(selectedMonth).format("MM/yyyy");
  const onMarkAttendence = (day, studentId, presentstatus) => {
    if (presentstatus) {
      const data = {
        day: day,
        studentId: studentId,
        present: presentstatus,
        date: date,
      };

      GlobalApi.MarkAttendence(data).then((res) => {
        console.log(res);
        toast("Student ID : " +  studentId  + "Marked as present");
      });
    }
  };

  return (
    <div>
      <div style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={(e) => {
            onMarkAttendence(e.colDef.field, e.data.studentId, e.newValue);
          }}
        />
      </div>
    </div>
  );
};

export default AttendenceGrid;
