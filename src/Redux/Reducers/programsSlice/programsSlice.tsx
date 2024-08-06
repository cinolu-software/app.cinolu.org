import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { apiBaseUrl } from "@/services/axios";
import { InitialStateProgramsType, ProgramsType, CreateProgramType, TransformedProgramsType, FormValueType } from "@/Types/Programs/ProgramsType";
import { RootState } from "@/Redux/Store";



const initialState: InitialStateProgramsType = {
    originalProgramsData: [],
    transformedProgramsData: [],
    status: "idle",
    error: null,
    isOpenModalCreateProgram: false,
    isOpenModalEditProgram: false,
    isOpenModalDeleteProgram: false,
    selectedProgram: null,
    navId: 1,
    tabId: 1,
    formValue: {
        name: "",
        description: "",
        start_at: "",
        end_at: "",
        types: [],
        requirements: []
    }
};

const transformPrograms = (programs: ProgramsType[]): TransformedProgramsType[] => {
    return programs.map(program => ({
        ...program,
        image: program.image || "admin/roles/user_role.png"
    }));
};

export const fetchPrograms = createAsyncThunk<{ original: ProgramsType[], transformed: TransformedProgramsType[] }>(
    'programs/fetchPrograms',
    async () => {
        const response = await axios.get<{ data: ProgramsType[] }>(`${apiBaseUrl}/programs`);
        const originalPrograms = response.data.data;
        const transformedPrograms = transformPrograms(originalPrograms);
        return { original: originalPrograms, transformed: transformedPrograms };
    }
);

export const createProgram = createAsyncThunk<ProgramsType, CreateProgramType>(
    'programs/createProgram',
    async (newProgram, { rejectWithValue }) => {
        try {
            newProgram.image = newProgram.image || "admin/roles/user_role.png";
            const response = await axios.post<{ data: ProgramsType }>(`${apiBaseUrl}/programs`, newProgram);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateProgram = createAsyncThunk<ProgramsType, { formValue: Partial<FormValueType>, programId: number }>(
    'programs/updateProgram',
    async ({ formValue, programId }, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const existingProgram = state.programs.originalProgramsData.find(program => program.id === programId);

        if (!existingProgram) {
            return rejectWithValue('Program not found');
        }

        const transformedProgram = {
            id: programId,
            name: formValue.name || existingProgram.name,
            description: formValue.description || existingProgram.description,
            start_at: formValue.start_at || existingProgram.start_at,
            end_at: formValue.end_at || existingProgram.end_at,
            types: formValue.types || existingProgram.types,
            requirements: formValue.requirements || existingProgram.requirements,
            image: formValue.image || existingProgram.image
        };
        try {
            const response = await axios.patch<{ data: ProgramsType }>(`${apiBaseUrl}/programs/${programId}`, transformedProgram);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const uploadProgramImage = createAsyncThunk<void, { programId: number | undefined, imageFile: File }>(
    'programs/uploadProgramImage',
    async ({ programId, imageFile }, { rejectWithValue }) => {
        const formData = new FormData();
        formData.append('attachment', imageFile);
        try {
            await axios.post(`${apiBaseUrl}/programs/attachment/${programId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteProgram = createAsyncThunk<number, number>(
    'programs/deleteProgram',
    async (programId, { rejectWithValue }) => {
        try {
            await axios.delete(`${apiBaseUrl}/programs/${programId}`);
            return programId;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

const ProgramSlice = createSlice({
    name: "programs",
    initialState,
    reducers: {
        setModalCreateProgram: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateProgram = action.payload.isOpen;
        },
        setModalEditProgram: (state, action: PayloadAction<{ isOpen: boolean, program: ProgramsType | null }>) => {
            state.isOpenModalEditProgram = action.payload.isOpen;
            state.selectedProgram = action.payload.program;
        },
        setModalDeleteProgram: (state, action: PayloadAction<{ isOpen: boolean, program: ProgramsType | null }>) => {
            state.isOpenModalDeleteProgram = action.payload.isOpen;
            state.selectedProgram = action.payload.program;
        },
        setNavId: (state, action: PayloadAction<number>) => {
            state.navId = action.payload;
        },
        setTabId: (state, action: PayloadAction<number>) => {
            state.tabId = action.payload;
        },
        setFormValue: (state, action: PayloadAction<{ field: keyof FormValueType, value: string }>) => {
            if (state.formValue) {
                // @ts-ignore
                state.formValue[action.payload.field] = action.payload.value;
            }
        },
        updateFormValue: (state, action: PayloadAction<ProgramsType>) => {
            state.formValue = {
                id: action.payload.id,
                name: action.payload.name,
                description: action.payload.description,
                start_at: action.payload.start_at,
                end_at: action.payload.end_at,
                types: action.payload.types,
                requirements: action.payload.requirements,
                image: action.payload.image || "default_program_image.png"
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPrograms.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPrograms.fulfilled, (state, action: PayloadAction<{ original: ProgramsType[], transformed: TransformedProgramsType[] }>) => {
                state.status = 'succeeded';
                state.originalProgramsData = action.payload.original;
                state.transformedProgramsData = action.payload.transformed;
            })
            .addCase(fetchPrograms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(createProgram.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProgram.fulfilled, (state, action: PayloadAction<ProgramsType>) => {
                state.status = 'succeeded';
                state.originalProgramsData.push(action.payload);
                state.transformedProgramsData.push({
                    ...action.payload,
                    image: action.payload.image || "admin/roles/user_role.png"
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
            .addCase(updateProgram.fulfilled, (state, action: PayloadAction<ProgramsType>) => {
                state.status = 'succeeded';
                const index = state.originalProgramsData.findIndex(program => program.id === action.payload.id);
                if (index !== -1) {
                    state.originalProgramsData[index] = action.payload;
                    state.transformedProgramsData[index] = {
                        ...action.payload,
                        image: action.payload.image || "admin/roles/user_role.png"
                    };
                }
            })
            .addCase(updateProgram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(uploadProgramImage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(uploadProgramImage.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(uploadProgramImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(deleteProgram.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteProgram.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = 'succeeded';
                state.originalProgramsData = state.originalProgramsData.filter(program => program.id !== action.payload);
                state.transformedProgramsData = state.transformedProgramsData.filter(program => program.id !== action.payload);
            })
            .addCase(deleteProgram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const { setModalCreateProgram, setModalEditProgram, setModalDeleteProgram, setFormValue, setTabId, setNavId } = ProgramSlice.actions;
export const selectProgramStatus = (state: RootState) => state.programs.status;
export const selectOriginalProgramData = (state: RootState) => state.programs.originalProgramsData;
export const selectTransformedProgramData = (state: RootState) => state.programs.transformedProgramsData;
export const selectIsOpenModalCreateProgram = (state: RootState) => state.programs.isOpenModalCreateProgram;
export const selectIsOpenModalEditProgram = (state: RootState) => state.programs.isOpenModalEditProgram;
export const selectIsOpenModalDeleteProgram = (state: RootState) => state.programs.isOpenModalDeleteProgram;
export const selectSelectedProgram = (state: RootState) => state.programs.selectedProgram;

export default ProgramSlice.reducer;
