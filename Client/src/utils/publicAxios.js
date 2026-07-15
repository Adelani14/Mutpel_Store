// publicAxios.js
import axios from "axios";

export default axios.create({
    baseURL: "https://mutpel-store.onrender.com",
    withCredentials: true,
});