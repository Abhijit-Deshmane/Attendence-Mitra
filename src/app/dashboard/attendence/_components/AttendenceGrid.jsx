import React, { useEffect, useState } from "react";

const AttendenceGrid = ({ attendenceList }) => {
  const [rowData, setRowData] = useState();

  useEffect(() => {
    const userList = getUniqueRecord();
    console.log(userList);
    setRowData(userList);
  }, [attendenceList]);

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

  return <div>AttendenceGrid</div>;
};

export default AttendenceGrid;
