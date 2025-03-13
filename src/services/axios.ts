import axios from "axios";
import {io, Socket} from 'socket.io-client'

export const apiBaseUrl = process.env.NEXT_PUBLIC_HOST;
export const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL
export let socket : Socket | null = null;

export const connectSocket = (token : string) => {
    if(!socket){
        socket = io(apiBaseUrl, {
            withCredentials: true,
            extraHeaders: {
                Authorization: token,
            },
        })
    }
}

export const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
};


const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials : true
});

export default axiosInstance;
