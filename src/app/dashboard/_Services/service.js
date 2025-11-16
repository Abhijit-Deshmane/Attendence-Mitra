export const getUniqueRecord = (attendenceList) => {
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
