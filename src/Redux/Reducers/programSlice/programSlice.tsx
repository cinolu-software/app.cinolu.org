import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {InitialStateProgramType, ProgramType, CreateProgramType, ProgramTypeWithImage, UpdateProgramType } from "@/Types/Programs/ProgramType";

const initialState: InitialStateProgramType = {
    originalPrograms: [],
    transformedPrograms: [],
    status : 'idle',
    error: null,
    isOpenModalCreateProgram: false,
    isOpenModalDeleteProgram: false,
    isOpenModalEditProgram: false,
    selectedProgram: null
}

const transformProgram = (program: ProgramType[]): ProgramTypeWithImage[] => {
    return program.map(p => {
        if (p.id === undefined) {
            throw new Error("Project type must have an id");
        }
        return {
            id: p.id,
            name: p.name || "",
            description: p.description || "",
            created_at: p.created_at || "",
            updated_at: p.updated_at || "",
            image: "/programs/call.jpg"
        };
    });
};

export const fetchProgram = createAsyncThunk(
    'program/fetchProgram',
    async () => {
        const response = await axiosInstance.get<{ data: ProgramType[] }>(`${apiBaseUrl}/programs`);
        const originalProgram = response.data.data;
        const transformedProgram = transformProgram(originalProgram);
        return { original: originalProgram, transformed: transformedProgram };
    }
);

export const createProgram = createAsyncThunk(
    'program/createProgram',
    async (newProgram: CreateProgramType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<{ data: ProgramType }>(`${apiBaseUrl}/programs`, newProgram);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateProgram = createAsyncThunk(
    'program/updateProgram',
    async (updatedProgram: UpdateProgramType , { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch<{ data: UpdateProgramType }>(`${apiBaseUrl}/programs/${updatedProgram.id}`, updatedProgram);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteProgram = createAsyncThunk(
    'program/deleteProgram',
    async (programId: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/programs/${programId}`);
            return programId;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

const ProgramSlice = createSlice({
    name: "program",
    initialState,
    reducers: {
        setModalCreateProgram: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateProgram = action.payload.isOpen;
        },
        setModalEditProgram: (state, action: PayloadAction<{ isOpen: boolean, program: ProgramType | null }>) => {
            state.isOpenModalEditProgram = action.payload.isOpen;
            state.selectedProgram = action.payload.program;
        },
        setModalDeleteProgram: (state, action: PayloadAction<{ isOpen: boolean, program: ProgramType | null }>) => {
            state.isOpenModalDeleteProgram = action.payload.isOpen;
            state.selectedProgram = action.payload.program;
        },
        reset: (state) => {
            state.selectedProgram = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProgram.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProgram.fulfilled, (state, action: PayloadAction<{ original: ProgramType[], transformed: ProgramTypeWithImage[] }>) => {
                state.status = 'succeeded';
                state.originalPrograms = action.payload.original;
                state.transformedPrograms = action.payload.transformed;
            })
            .addCase(fetchProgram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Something went wrong';
            })
            .addCase(createProgram.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProgram.fulfilled, (state, action: PayloadAction<ProgramType>) => {
                state.status = 'succeeded';
                state.originalPrograms.push(action.payload);

                if (action.payload.id === undefined) {
                    throw new Error("New program type must have an id");
                }

                state.transformedPrograms.push({
                    id: action.payload.id,
                    name: action.payload.name || "",
                    description: action.payload.description || "",
                    created_at: action.payload.created_at || "",
                    updated_at: action.payload.updated_at || "",
                    image: "programs/types/typeProgram.png"
                });
            })
            .addCase(createProgram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(updateProgram.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProgram.fulfilled, (state, action: PayloadAction<UpdateProgramType>) => {
                state.status = 'succeeded';
                const index = state.originalPrograms.findIndex((program: { id: string }) => program.id === action.payload.id);
                if (index !== -1) {
                    state.originalPrograms[index] = action.payload;
                    // @ts-ignore
                    state.transformedProgramsData[index] = {
                        ...action.payload,
                        image: "programs/types/typeProgram.png"
                    };
                }
            })
            .addCase(updateProgram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(deleteProgram.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteProgram.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.originalPrograms = state.originalPrograms.filter((project: { id: string; }) => project.id !== action.payload);
                state.transformedPrograms = state.transformedPrograms.filter(program => program.id !== action.payload);
            })
            .addCase(deleteProgram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const { setModalCreateProgram, setModalEditProgram, setModalDeleteProgram, reset } = ProgramSlice.actions;

export default ProgramSlice.reducer;