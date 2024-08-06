import axios from "axios";

export const apiBaseUrl = "http://localhost:8000";
//export const apiBaseUrl = "https://api.cinolu.org";
export const imageBaseUrl = "http://localhost:8000/uploads";
//export const imageBaseUrl = "https://api.cinolu.org/uploads";


export default axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});