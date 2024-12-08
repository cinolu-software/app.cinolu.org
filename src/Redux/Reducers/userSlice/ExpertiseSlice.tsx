import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance , { apiBaseUrl } from "@/services/axios";
import { InitialStateExpertiseType, Expertise, UpdateExpertiseType, CreateExpertiseType} from "@/Types/Users/Coachs/ExpertiseType"
import { RootState } from "@/Redux/Store";

const initialState: InitialStateExpertiseType = {
    dataExpertise: [],
    status: "idle",
    error: null,
    isOpenModalCreateExpertiseType: false,
    isOpenModalEditExpertiseType: false,
    isOpenModalDeleteExpertiseType: false,
    selectedExpertiseType: null
};

const transformExpertise = (types: Expertise[]): Expertise[] => {
    return types.map(type => {
        if (type.id === undefined) {
            throw new Error("Expertise type must have an id");
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

export const fetchExpertises = createAsyncThunk(
    'userExpertises/fetchExpertises',
    async () => {
        const response = await axiosInstance.get<{ data: Expertise[] }>(`${apiBaseUrl}/user-expertises`);
        const data = response.data.data;
        const transformedExpertiseData = transformExpertise(data);
        return { data : transformedExpertiseData };
    }
);

export const createExpertise = createAsyncThunk(
    'userExpertises/createExpertises',
    async (newExpertise: CreateExpertiseType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<{ data: Expertise }>(`${apiBaseUrl}/user-expertises`, newExpertise);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateExpertise = createAsyncThunk(
    'userExpertises/updateExpertises',
    async (updatedExpertise: UpdateExpertiseType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch<{ data: Expertise }>(`${apiBaseUrl}/user-expertises/${updatedExpertise.id}`, updatedExpertise);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteExpertise = createAsyncThunk(
    'userExpertises/deleteExpertises',
    async (expertiseId: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/user-expertises/${expertiseId}`);
            return expertiseId;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

const ExpertiseSlice = createSlice({
    name: "expertise",
    initialState,
    reducers: {
        setModalCreateExpertise: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateExpertiseType = action.payload.isOpen;
        },
        setModalEditExpertise: (state, action: PayloadAction<{ isOpen: boolean, expertise: Expertise }>) => {
            state.isOpenModalEditExpertiseType = action.payload.isOpen;
            state.selectedExpertiseType = action.payload.expertise;
        },
        setModalDeleteExpertise: (state, action: PayloadAction<{ isOpen: boolean, expertise: Expertise | null }>) => {
            state.isOpenModalDeleteExpertiseType = action.payload.isOpen;
            state.selectedExpertiseType = action.payload.expertise;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpertises.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchExpertises.fulfilled, (state, action: PayloadAction<{ data : Expertise [] }>) => {
                state.status = 'succeeded';
                state.dataExpertise = action.payload.data;
            })
            .addCase(fetchExpertises.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(createExpertise.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createExpertise.fulfilled, (state, action: PayloadAction<Expertise>) => {
                state.status = 'succeeded';
                state.dataExpertise.push(action.payload);

            })
            .addCase(createExpertise.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(updateExpertise.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateExpertise.fulfilled, (state, action: PayloadAction<Expertise>) => {
                state.status = 'succeeded';
                const index = state.dataExpertise.findIndex((expertise: { id: string }) => expertise.id === action.payload.id);
                if (index !== -1) {
                    state.dataExpertise[index] = action.payload;
                    // @ts-ignore
                    state.dataExpertise[index] = {
                        ...action.payload,
                        image: "programs/types/typeProgram.png"
                    };
                }
            })
            .addCase(updateExpertise.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(deleteExpertise.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteExpertise.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.dataExpertise = state.dataExpertise.filter((expertise: { id: string; }) => expertise.id !== action.payload);
            })
            .addCase(deleteExpertise.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const { setModalCreateExpertise, setModalDeleteExpertise, setModalEditExpertise } = ExpertiseSlice.actions;


export default ExpertiseSlice.reducer;