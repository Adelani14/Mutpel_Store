// publicAxios.js
import axios from "axios";

export default axios.create({
    baseURL: "https://mutpelapi.devadelani.com.ng",
    withCredentials: true,
});