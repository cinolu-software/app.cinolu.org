import axios from "axios";
export const apiBaseUrl = "http://localhost:8000";
export const imageBaseUrl = "http://localhost:8000/uploads";

export default axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});