import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.rawg.io/api/"
});

export default axiosInstance;