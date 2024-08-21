import axios from "axios";

const apiURL = "http://localhost:5000/api/user";


const regesterUser = async (data) => {
    try {
        const response = await axios.post(apiURL + "/register", data);
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

const loginUser = async (data) => {
    try {
        const response = await axios.post(apiURL + "/login", data);
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

export default {
    regesterUser,
    loginUser
}