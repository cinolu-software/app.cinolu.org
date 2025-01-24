import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {ApplicationPhaseType, InitialStateApplicationPhaseType} from "@/Types/Projects/PhasesApplicationType";

const initialState: InitialStateApplicationPhaseType = {
    ApplicationPhaseData : [],
    status: 'idle',
    error: null
}

export const fetchApplicationByproject = createAsyncThunk('project-application/fetchApplicationByProject', async ()=>{
    const response = await axiosInstance.get<{}>(`${apiBaseUrl}/project-applications/project/`)
})

const PhaseApplicationSlice = createSlice({
    name: 'phaseApplication',
    initialState,
    reducers: {},
    extraReducers: ()=>{}
});

export default PhaseApplicationSlice.reducer;