import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, { apiBaseUrl } from "@/services/axios";
import {
    InitialStateRequirementType,
    RequirementType,
    CreateRequirementPayloadType,
} from "@/Types/Programs/PhasesRequirementType";


const initialState: InitialStateRequirementType = {
    RequirementData: [],
    status: "idle",
    error: null,
    formValue: {
        name: "",
        description: "",
    },
    isOpenModalCreateRequirement: false,
    isOpenModalEditRequirement: false,
    isOpenModalDeleteRequirement: false,
    selectedRequirement: null,
};


export const fetchRequirement = createAsyncThunk(
    "requirement/fetchRequirement",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/phase-requirements/`);
            return { data: response.data.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors du chargement.");
        }
    }
);


export const createRequirement = createAsyncThunk(
    "requirement/createRequirement",
    async (payload: CreateRequirementPayloadType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/phase-requirements/`, payload);
            return { data: response.data.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de la création.");
        }
    }
);


export const updateRequirement = createAsyncThunk(
    "requirement/updateRequirement",
    async (requirement: RequirementType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `${apiBaseUrl}/phase-requirements/${requirement.id}/`,
                requirement
            );
            return { data: response.data.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de la mise à jour.");
        }
    }
);


export const deleteRequirement = createAsyncThunk(
    "requirement/deleteRequirement",
    async (id: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/phase-requirements/${id}/`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de la suppression.");
        }
    }
);


const RequirementsPhaseSlice = createSlice({
    name: "phaseRequirement",
    initialState,
    reducers: {

        setFormValue: (state, action: PayloadAction<Partial<InitialStateRequirementType["formValue"]>>) => {
            state.formValue = { ...state.formValue, ...action.payload };
        },

        toggleCreateModal: (state) => {
            state.isOpenModalCreateRequirement = !state.isOpenModalCreateRequirement;
        },

        toggleEditModal: (state) => {
            state.isOpenModalEditRequirement = !state.isOpenModalEditRequirement;
        },

        toggleDeleteModal: (state) => {
            state.isOpenModalDeleteRequirement = !state.isOpenModalDeleteRequirement;
        },

        setSelectedRequirement: (state, action: PayloadAction<RequirementType | null>) => {
            state.selectedRequirement = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchRequirement.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchRequirement.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.RequirementData = action.payload.data;
            })
            .addCase(fetchRequirement.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            // Création d'une exigence
            .addCase(createRequirement.fulfilled, (state, action) => {
                state.RequirementData.push(...action.payload.data);
            })
            .addCase(createRequirement.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // Mise à jour d'une exigence
            .addCase(updateRequirement.fulfilled, (state, action) => {
                const updatedRequirement = action.payload.data;
                const index = state.RequirementData.findIndex((req) => req.id === updatedRequirement.id);
                if (index !== -1) {
                    state.RequirementData[index] = updatedRequirement;
                }
            })
            .addCase(updateRequirement.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // Suppression d'une exigence
            .addCase(deleteRequirement.fulfilled, (state, action) => {
                state.RequirementData = state.RequirementData.filter(
                    (requirement) => requirement.id !== action.payload
                );
            })
            .addCase(deleteRequirement.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

// Actions exportées
export const {
    setFormValue,
    toggleCreateModal,
    toggleEditModal,
    toggleDeleteModal,
    setSelectedRequirement,
} = RequirementsPhaseSlice.actions;

// Reducer exporté
export default RequirementsPhaseSlice.reducer;
