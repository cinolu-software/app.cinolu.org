import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {ApplicationPhaseType, InitialStateApplicationPhaseType} from "@/Types/Projects/PhasesApplicationType";

const initialState: InitialStateApplicationPhaseType = {
    ApplicationPhaseData : [],
    page: false,
    status: 'idle',
    error: null
}

export const fetchApplicationByproject = createAsyncThunk('project-application/fetchApplicationByProject', async (id: string)=>{
    const response = await axiosInstance.get<ApplicationPhaseType[]>(`${apiBaseUrl}/project-applications/project/${id}`);
    // @ts-ignore
    return {data : response.data.data}
})

const PhaseApplicationSlice = createSlice({
    name: 'phaseApplication',
    initialState,
    reducers: {
        setPage: (state,action) => {
            state.page = action.payload
        },
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchApplicationByproject.pending, (state)=>{
                state.status = 'loading';
                state.error = null
            })
            // @ts-ignore
            .addCase(fetchApplicationByproject.fulfilled, (state, action : PayloadAction<ApplicationPhaseType>) => {
                state.status = 'succeeded';
                // @ts-ignore
                state.ApplicationPhaseData = action.payload.data
            })
            .addCase(fetchApplicationByproject.rejected, (state)=>{
                state.status = 'failed';
                state.error = "Something went wrong"
            })   
    }
});

export const {setPage} = PhaseApplicationSlice.actions;

export default PhaseApplicationSlice.reducer;