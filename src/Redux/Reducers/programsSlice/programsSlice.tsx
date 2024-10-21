import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance, { apiBaseUrl, imageBaseUrl } from "@/services/axios";
import { CreateProgramType, FormValueType, InitialStateProgramsType, ReceiveProgramsType } from "@/Types/Programs/ProgramsType";
import { RootState } from "@/Redux/Store";

const initialState: InitialStateProgramsType = {
    originalProgramsData: [],
    status: "idle",
    error: null,
    isOpenModalCreateProgram: false,
    isOpenModalEditProgram: false,
    isOpenModalDeleteProgram: false,
    filterToggle: false,
    selectedProgram: null,
    navId: 1,
    tabId: 1,
    formValue: {
        name: "",
        description: "",
        start_at: "",
        end_at: "",
        types: [],
        requirements: [],
        partners: []
    },
    EditFormValue: {
        name: "",
        description: "",
        start_at: "",
        end_at: "",
        types: [],
        requirements: [],
        partners: []
    }
};

export const fetchPrograms = createAsyncThunk('programs/fetchPrograms', async () => {
    const response = await axiosInstance.get<{ data: any }>(`${apiBaseUrl}/programs`);
    const originalPrograms = response.data.data.programs;
    return { original: originalPrograms };
});

export const createProgram = createAsyncThunk<ReceiveProgramsType, CreateProgramType, { rejectValue: any }>(
    'programs/createProgram',
    async (newProgram, thunkAPI) => {
        try {
            const response = await axiosInstance.post<{ data: ReceiveProgramsType }>(`${apiBaseUrl}/programs`, newProgram);
            return response.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const updateProgram = createAsyncThunk<ReceiveProgramsType, { programId: string, updatedProgram: any }, { rejectValue: any }>(
    'programs/updateProgram',
    async ({ programId, updatedProgram }, thunkAPI) => {
        try {
            const response = await axiosInstance.put<{ data: ReceiveProgramsType }>(`${apiBaseUrl}/programs/${programId}`, updatedProgram);
            return response.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const ProgramSlice = createSlice({
    name: "programs",
    initialState,
    reducers: {
        setSelectedProgram: (state, action: PayloadAction<{program: ReceiveProgramsType | null}>) => {
            state.selectedProgram = action.payload.program;
        },
        setModalCreateProgram: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateProgram = action.payload.isOpen;
        },
        setModalEditProgram: (state, action: PayloadAction<{ isOpen: boolean, program: ReceiveProgramsType | null }>) => {
            state.isOpenModalEditProgram = action.payload.isOpen;
            state.selectedProgram = action.payload.program;
        },
        setModalDeleteProgram: (state, action: PayloadAction<{ isOpen: boolean, program: ReceiveProgramsType | null }>) => {
            state.isOpenModalDeleteProgram = action.payload.isOpen;
            state.selectedProgram = action.payload.program;
        },
        setNavId: (state, action: PayloadAction<number>) => {
            state.navId = action.payload;
        },
        setTabId: (state, action: PayloadAction<number>) => {
            state.tabId = action.payload;
        },
        setFormValue: (state, action: PayloadAction<{ field: keyof FormValueType, value: any }>) => {
            if (action.payload.field === 'types' && typeof action.payload.value === 'string') {
                //@ts-ignore
                state.formValue.types = JSON.parse(action.payload.value).map((type: string) => parseInt(type));
            } else {
                //@ts-ignore
                state.formValue[action.payload.field] = action.payload.value;
            }
        },
        setEditFormValue: (state, action: PayloadAction<{ field: keyof FormValueType, value: any }>) => {
            if (action.payload.field === 'types' && typeof action.payload.value === 'string') {
                //@ts-ignore
                state.EditFormValue.types = JSON.parse(action.payload.value).map((type: string) => parseInt(type));
            } else {
                //@ts-ignore
                state.EditFormValue[action.payload.field] = action.payload.value;
            }
        },
        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPrograms.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPrograms.fulfilled, (state, action: PayloadAction<{ original: ReceiveProgramsType[] }>) => {
                state.status = 'succeeded';
                state.originalProgramsData = action.payload.original;
            })
            .addCase(fetchPrograms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(createProgram.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProgram.fulfilled, (state, action: PayloadAction<ReceiveProgramsType>) => {
                state.status = 'succeeded';
                state.originalProgramsData.push(action.payload);
            })
            .addCase(createProgram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(updateProgram.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProgram.fulfilled, (state, action: PayloadAction<ReceiveProgramsType>) => {
                state.status = 'succeeded';
                const updatedProgram = action.payload;
                const existingProgram = state.originalProgramsData.find((program) => program.id === updatedProgram.id);
                if (existingProgram) {
                    Object.assign(existingProgram, updatedProgram);
                }
            })
            .addCase(updateProgram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const { setModalCreateProgram, setModalEditProgram, setModalDeleteProgram, setNavId, setTabId, setFormValue, setEditFormValue, setFilterToggle, setSelectedProgram } = ProgramSlice.actions;
export const selectSelectedProgram = (state: RootState) => state.programs.selectedProgram;
export default ProgramSlice.reducer;
