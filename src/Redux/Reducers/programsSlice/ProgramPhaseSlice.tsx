import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {InitialStateProgramPhaseType, ProgramPhaseType, CreateProgramPhaseType, FormValue} from "@/Types/Programs/PhasesType";

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
    },
}

export const fetchProgramPhase = createAsyncThunk('programs/fetchProgramPhase', async () => {
    const response = await axiosInstance.get<{data: ProgramPhaseType[]}>(`${apiBaseUrl}/program-phases`);
    return {data : response.data.data}
});

export const createProgramPhase = createAsyncThunk('programs/createProgramPhase', async(newProgramPhase: CreateProgramPhaseType)=>{
    try{
        const response = await axiosInstance.post<{data: ProgramPhaseType}>(`${apiBaseUrl}/program-phases`, newProgramPhase);
        return response.data.data;
    }catch(err: any){
        return "Erreur survenue lors de la création de la phase"
    }
})

export const updateProgramPhase = createAsyncThunk(
    'programs/updateProgramPhase',
    async (updatedProgramPhase: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch<{ data: ProgramPhaseType }>(
                `${apiBaseUrl}/program-phases/${updatedProgramPhase.id}`,
                updatedProgramPhase
            );
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue("Erreur survenue lors de la mise à jour de la phase");
        }
    }
);

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
        },
        setFormValue: (state, action: PayloadAction<{ field: keyof FormValue, value: string }>) => {
            const { field, value } = action.payload;

            if (field in state.formValue) {
                state.formValue[field as keyof FormValue] = value;
            } else {
                console.warn(`Le champ ${field} n'existe pas dans formValue.`);
            }
        },

        resetFormValue: (state) => {
            state.formValue = {
                name: '',
                description: '',
                started_at: '',
                ended_at: '',
                program: '',
            };
        },
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
            .addCase(updateProgramPhase.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProgramPhase.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                const index = state.ProgramDataPhase.findIndex(
                    (phase) => phase.id === action.payload.id
                );
                if (index !== -1) {
                    state.ProgramDataPhase[index] = action.payload;
                }
            })
            .addCase(updateProgramPhase.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export const {setModalcreateProgramPhase, setModalEditProgramPhase, setModalDeleteProgramPhase, setSelectedProgramPhase} = ProgramPhaseSlice.actions

export default ProgramPhaseSlice.reducer;

