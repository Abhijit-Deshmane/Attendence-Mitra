// const { axios } = require("axios");
import axios from "axios";
const GetAllClass = ()=> axios.get('/api/class');
const CreateNewStudent = (data) => axios.post('/api/student', data);
const GetAllStudent = () => axios.get('/api/student');

export default {
    GetAllClass,
    CreateNewStudent,
    GetAllStudent
}