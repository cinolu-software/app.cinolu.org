import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {InitialStateProgramPhaseType, ProgramPhaseType, CreateProgramPhaseTy} from "@/Types/Programs/PhasesType";

const initialState: InitialStateProgramPhaseType = {
    ProgramDataPhase: [],
    status: 'idle',
    error: null,
    isOpenModalCreateProgramPhase : false,
    isOpenModalDeleteProgramPhase : false,
    isOpenModalEditProgramPhase : false,
    selectedProgramPhase: null,
    formValue : {
        name : '',
        description: '',
        started_at: '',
        ended_at: '',
        program: ''
    }
}

export const fetchProgramPhase = createAsyncThunk('programs/fetchProgramPhase', async () => {
    const response = await axiosInstance.get<{data: ProgramPhaseType[]}>(`${apiBaseUrl}/program-phases`);
    return {data : response}
});

export const createProgramPhase = createAsyncThunk('programs/createProgramPhase', async(newProgramPhase: CreateProgramPhaseTy)=>{
    try{
        const response = await axiosInstance.post<{data: ProgramPhaseType}>(`${apiBaseUrl}/program-phases`, newProgramPhase);
        return response.data.data;
    }catch(err: any){
        return "Erreur survenue lors de la création de la phase"
    }
})

const ProgramPhaseSlice = createSlice({
    name: 'programsPhase',
    initialState,
    reducers: {
        setSelectedProgramPhase : (state, action: PayloadAction<any> | null)=>{
            state.selectedProgramPhase = action?.payload.programPhase;
        },
        setModalcreateProgramPhase: (state, action: PayloadAction<{isOpen: boolean}>) => {
            state.isOpenModalCreateProgramPhase = action.payload.isOpen;
        },
        setModalEditProgramPhase: (state, action: PayloadAction<{isOpen: boolean, programPhase: ProgramPhaseType | null }>) => {
            state.isOpenModalEditProgramPhase = action.payload.isOpen;
            state.selectedProgramPhase = action.payload.programPhase;
        },
        setModalDeleteProgramPhase: (state, action: PayloadAction<{isOpen: boolean, programPhase: ProgramPhaseType | null}>) => {
            state.isOpenModalEditProgramPhase = action.payload.isOpen;
            state.selectedProgramPhase = action.payload.programPhase;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProgramPhase.pending, (state)=>{
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProgramPhase.fulfilled, (state, action: PayloadAction<{data: any}>) => {
                state.status = 'succeeded';
                state.ProgramDataPhase = action.payload.data
            })
            .addCase(fetchProgramPhase.rejected, (state)=>{
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProgramPhase.pending, (state)=>{
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProgramPhase.fulfilled, (state, action: PayloadAction<any>)=>{
                state.status = 'succeeded';
                state.ProgramDataPhase.push(action.payload);
            })
            .addCase(createProgramPhase.rejected, (state)=>{
                state.status = 'failed';
                state.error= "Something went wrong"
            })
    }
});

export const {setModalcreateProgramPhase, setModalEditProgramPhase, setModalDeleteProgramPhase, setSelectedProgramPhase} = ProgramPhaseSlice.actions

export default ProgramPhaseSlice.reducer;

