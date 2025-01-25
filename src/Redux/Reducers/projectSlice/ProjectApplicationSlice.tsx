import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {ApplicationPhaseType, InitialStateApplicationPhaseType} from "@/Types/Projects/PhasesApplicationType";

const initialState: InitialStateApplicationPhaseType = {
    ApplicationPhaseData : [],
    status: 'idle',
    error: null
}

export const fetchApplicationByproject = createAsyncThunk('project-application/fetchApplicationByProject', async (id: string)=>{
    const response = await axiosInstance.get<ApplicationPhaseType[]>(`${apiBaseUrl}/project-applications/project/${id}`);
    return {data : response.data.data}
})

const PhaseApplicationSlice = createSlice({
    name: 'phaseApplication',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchApplicationByproject.pending, (state)=>{
                state.status = 'loading';
                state.error = null
            })
            .addCase(fetchApplicationByproject.fulfilled, (state, action : PayloadAction<ApplicationPhaseType>) => {
                state.status = 'succeeded';
                state.ApplicationPhaseData = action.payload.data
            })
            .addCase(fetchApplicationByproject.rejected, (state)=>{
                state.status = 'failed';
                state.error = "Something went wrong"
            })   
    }
});

export default PhaseApplicationSlice.reducer;