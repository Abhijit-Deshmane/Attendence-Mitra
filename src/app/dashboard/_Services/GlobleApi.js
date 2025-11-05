const { default: axios } = require("axios");

const GetAllClass = ()=> axios.get('/api/Class');

export default{
    GetAllClass
}