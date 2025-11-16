// const { axios } = require("axios");
import axios from "axios";
const GetAllClass = () => axios.get("/api/class");
const CreateNewStudent = (data) => axios.post("/api/student", data);
const GetAllStudent = () => axios.get("/api/student");
const DeleteStudentRecord = (id) => axios.delete("/api/student?id=" + id);
const GetAttandenceList = (grade, month) =>
  axios.get("/api/attendence?grade=" + grade + "&month=" + month);
const MarkAttendence = (data) => axios.post("/api/attendence", data);
const MarkAbsent = (studentId, day, date) =>
  axios.delete(
    "/api/attendence?studentId=" + studentId + "&day=" + day + "&date=" + date
  );

export default {
  GetAllClass,
  CreateNewStudent,
  GetAllStudent,
  DeleteStudentRecord,
  GetAttandenceList,
  MarkAttendence,
  MarkAbsent,
};
