import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios, {apiBaseUrl} from "@/services/axios";

const initialState = {
    statusData: [],
    status: "idle",
    error: null,
};

export const fetchStatus = createAsyncThunk("", async () => {
    const response = await axios.get(`${apiBaseUrl}/status`);
    return response.data.data;
});

const StatusSlice = createSlice({
    name: "Status",
    initialState,
    reducers: {},
    extraReducers :  (builder) => {

    }
});

export default StatusSlice.reducer;