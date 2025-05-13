import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import {InitialStateEvenementType, formValueType, EvenementType, } from "@/Types/evenement";
import axiosInstance, { apiBaseUrl } from "@/services/axios";

const initialFormValue: formValueType = {
    id: "",
    name: "",
    link: "",
    responsible: "",
    location: "",
    description: "",
    started_at: "",
    ended_at: "",
    program: "",
    categories: [],
};

const initialState: InitialStateEvenementType = {
    originalProjectData: [],
    publishedProjectData: [],
    selectedEvenement: null,
    status: "idle",
    addFormValue: { ...initialFormValue },
    editFormValue: { ...initialFormValue },
    numberLevel: 1,
    showFinish: false,
    error: null
};

export const createEvenement = createAsyncThunk<EvenementType, formValueType, { rejectValue: string }>(
    'events/createEvenement',
    async (newActivity, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/events`, newActivity);
            return response.data.data as EvenementType;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors de la création.");
        }
    }
);

export const updateEvenement = createAsyncThunk<EvenementType, { evenementId: string; updatedEvenement: formValueType }, { rejectValue: string }>(
    'evenement/updateEvenement',
    async ({ evenementId, updatedEvenement }, thunkAPI) => {
        try {
            const response = await axiosInstance.patch<{ data: EvenementType }>(
                `${apiBaseUrl}/events/${evenementId}`,
                updatedEvenement
            );
            return response.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Erreur lors de la mise à jour.");
        }
    }
);

const EvenementSlice = createSlice({
    name: "EvenementSlice",
    initialState,
    reducers: {
        setAddFormValue: (state, action: PayloadAction<{ field: keyof formValueType; value: any }>) => {
            const { field, value } = action.payload;
            if (field === "started_at" || field === "ended_at") {
                state.addFormValue[field] = new Date(value).toISOString().split("T")[0];
            } else {
                state.addFormValue[field] = value;
            }
        },
        resetForm: (state) => {
            state.addFormValue = { ...initialFormValue };
            state.editFormValue = { ...initialFormValue };
        },
        setSelectedEvenement : (state, action: PayloadAction<EvenementType | null>) => {
            state.selectedEvenement = action.payload;
            if(action.payload !== null) {
                //@ts-ignore
                state.addFormValue = {...action.payload};
                //@ts-ignore
                state.editFormValue = { ...action.payload };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEvenement.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createEvenement.fulfilled, (state, action: PayloadAction<EvenementType>) => {
                state.status = "succeeded";
                state.originalProjectData.push(action.payload);
                state.selectedEvenement = action.payload;
                state.error = null;
            })
            .addCase(createEvenement.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(updateEvenement.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateEvenement.fulfilled, (state, action: PayloadAction<EvenementType>) => {
                state.status = "succeeded";
                const index = state.originalProjectData.findIndex(a => a.id === action.payload.id);
                if (index !== -1) {
                    state.originalProjectData[index] = action.payload;
                }
                state.selectedEvenement = action.payload;
                state.error = null;
            })
            .addCase(updateEvenement.rejected, (state) => {
                state.status = "failed";
            });
    }
});

export const { setAddFormValue, resetForm, setSelectedEvenement } = EvenementSlice.actions;

export default EvenementSlice.reducer;