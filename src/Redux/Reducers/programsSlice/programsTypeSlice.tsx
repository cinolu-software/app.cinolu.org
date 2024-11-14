import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance , { apiBaseUrl } from "@/services/axios";
import {
    InitialStateProgramsTypeType,
    ProgramsTypeType,
    CreateProgramTypeType,
    TransformedProgramsTypeType,
    UpdateTypeType
} from "@/Types/Programs/ProgramsTypeType";
import { RootState } from "@/Redux/Store";

const initialState: InitialStateProgramsTypeType = {
    originalTypeProgramsData: [],
    transformedProgramsData: [],
    status: "idle",
    error: null,
    isOpenModalCreateProgramType: false,
    isOpenModalEditProgramType: false,
    isOpenModalDeleteProgramType: false,
    selectedProgramType: null
};

const transformProgramsType = (types: ProgramsTypeType[]): TransformedProgramsTypeType[] => {
    return types.map(type => {
        if (type.id === undefined) {
            throw new Error("Program type must have an id");
        }
        return {
            id: type.id,
            name: type.name || "",
            description: type.description || "",
            created_at: type.created_at || "",
            updated_at: type.updated_at || "",
            image: "programs/types/typeProgram.png"
        };
    });
};

export const fetchProgramsType = createAsyncThunk(
    'programs/fetchProgramsType',
    async () => {
        const response = await axiosInstance.get<{ data: ProgramsTypeType[] }>(`${apiBaseUrl}/program-types`);
        const originalProgramsTypes = response.data.data;
        const transformedPrograms = transformProgramsType(originalProgramsTypes);
        return { original: originalProgramsTypes, transformed: transformedPrograms };
    }
);

export const createProgramType = createAsyncThunk(
    'programs/createProgramType',
    async (newProgramType: CreateProgramTypeType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<{ data: ProgramsTypeType }>(`${apiBaseUrl}/program-types`, newProgramType);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateProgramType = createAsyncThunk(
    'programs/updateProgramType',
    async (updatedProgramType: UpdateTypeType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch<{ data: UpdateTypeType }>(`${apiBaseUrl}/program-types/${updatedProgramType.id}`, updatedProgramType);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteProgramType = createAsyncThunk(
    'programs/deleteProgramType',
    async (programTypeId: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/program-types/${programTypeId}`);
            return programTypeId;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

const ProgramsTypeSlice = createSlice({
    name: "programs",
    initialState,
    reducers: {
        setModalCreateProgramTypes: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateProgramType = action.payload.isOpen;
        },
        setModalEditProgramTypes: (state, action: PayloadAction<{ isOpen: boolean, programType: ProgramsTypeType | null }>) => {
            state.isOpenModalEditProgramType = action.payload.isOpen;
            state.selectedProgramType = action.payload.programType;
        },
        setModalDeleteProgramTypes: (state, action: PayloadAction<{ isOpen: boolean, programType: ProgramsTypeType | null }>) => {
            state.isOpenModalDeleteProgramType = action.payload.isOpen;
            state.selectedProgramType = action.payload.programType;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProgramsType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProgramsType.fulfilled, (state, action: PayloadAction<{ original: ProgramsTypeType[], transformed: TransformedProgramsTypeType[] }>) => {
                state.status = 'succeeded';
                state.originalTypeProgramsData = action.payload.original;
                state.transformedProgramsData = action.payload.transformed;
            })
            .addCase(fetchProgramsType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(createProgramType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProgramType.fulfilled, (state, action: PayloadAction<ProgramsTypeType>) => {
                state.status = 'succeeded';
                state.originalTypeProgramsData.push(action.payload);

                if (action.payload.id === undefined) {
                    throw new Error("New program type must have an id");
                }

                state.transformedProgramsData.push({
                    id: action.payload.id,
                    name: action.payload.name || "",
                    description: action.payload.description || "",
                    created_at: action.payload.created_at || "",
                    updated_at: action.payload.updated_at || "",
                    image: "programs/types/typeProgram.png"
                });
            })
            .addCase(createProgramType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(updateProgramType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProgramType.fulfilled, (state, action: PayloadAction<ProgramsTypeType>) => {
                state.status = 'succeeded';
                const index = state.originalTypeProgramsData.findIndex((program: { id: string; }) => program.id === action.payload.id);
                if (index !== -1) {
                    state.originalTypeProgramsData[index] = action.payload;
                    // @ts-ignore
                    state.transformedProgramsData[index] = {
                        ...action.payload,
                        image: "programs/types/typeProgram.png"
                    };
                }
            })
            .addCase(updateProgramType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(deleteProgramType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteProgramType.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.originalTypeProgramsData = state.originalTypeProgramsData.filter((program: { id: string; }) => program.id !== action.payload);
                state.transformedProgramsData = state.transformedProgramsData.filter(program => program.id !== action.payload);
            })
            .addCase(deleteProgramType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const { setModalCreateProgramTypes, setModalEditProgramTypes, setModalDeleteProgramTypes } = ProgramsTypeSlice.actions;
export const selectProgramTypeStatus = (state: RootState) => state.programsType.status;
export const selectOriginalProgramData = (state: RootState) => state.programsType.originalTypeProgramsData;
export const selectTransformedProgramDataType = (state: RootState) => state.programsType.transformedProgramsData;
export const selectProgramError = (state: RootState) => state.programsType.error;

export default ProgramsTypeSlice.reducer;