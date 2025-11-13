// const { axios } = require("axios");
import axios from "axios";
const GetAllClass = ()=> axios.get('/api/class');
const CreateNewStudent = (data) => axios.post('/api/student', data);
const GetAllStudent = () => axios.get('/api/student');
const DeleteStudentRecord = (id) => axios.delete('/api/student?id=' + id);

export default {
    GetAllClass,
    CreateNewStudent,
    GetAllStudent,
    DeleteStudentRecord
}