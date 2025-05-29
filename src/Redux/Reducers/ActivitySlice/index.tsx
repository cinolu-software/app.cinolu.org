import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    formValueType,
    InitialStateActivityType,
    ActivityReceive,
    createActivityType
} from "@/Types/ActivitiesTypes";
import axiosInstance, { apiBaseUrl } from "@/services/axios";

const initialFormValue: formValueType = {
    id: "",
    name: "",
    description: "",
    started_at: '',
    ended_at: '',
    program: '',
    categories: [],
    form: [],
    review_form: [],
    partners: []
};

const initialState: InitialStateActivityType = {
    originalProjectData: [],
    publishedProjectData: [],
    selectedActivity: null,
    status: "idle",
    addFormValue: { ...initialFormValue },
    editFormValue: { ...initialFormValue },
    numberLevel: 1,
    showFinish: false,
    error: null
};

export const createActivity = createAsyncThunk<
    ActivityReceive,
    createActivityType,
    { rejectValue: string }
>(
    'activity/createActivity',
    async (newActivity, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/projects`, newActivity);
            return response.data.data as ActivityReceive;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors de la création.");
        }
    }
);

export const updateActivity = createAsyncThunk<
    ActivityReceive,
    { activityId: string; updatedActivity: createActivityType },
    { rejectValue: string }
>(
    'activity/updateActivity',
    async ({ activityId, updatedActivity }, thunkAPI) => {
        try {
            const response = await axiosInstance.patch<{ data: ActivityReceive }>(
                `${apiBaseUrl}/projects/${activityId}`,
                updatedActivity
            );
            return response.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Erreur lors de la mise à jour.");
        }
    }
);

const ActivitySlice = createSlice({
    name: "ActivitySlice",
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
        setEditFormValue: (state, action: PayloadAction<{field: keyof formValueType; value: any}>) => {
            const { field, value } = action.payload;
            if (field === "started_at" || field === "ended_at") {
                state.editFormValue[field] = new Date(value).toISOString().split("T")[0];
            } else {
                state.editFormValue[field] = value;
            }
        },
        resetForm: (state) => {
            state.addFormValue = { ...initialFormValue };
            state.editFormValue = { ...initialFormValue };
        },
        setFormField: (state, action: PayloadAction<{ form?: any[]; curationForm?: any[] }>) => {
            if (action.payload.form !== undefined) {
                state.addFormValue.form = action.payload.form;
            }
            if (action.payload.curationForm !== undefined) {
                state.addFormValue.review_form = action.payload.curationForm;
            }
        },
        setSelectedActivity : (state, action: PayloadAction<ActivityReceive | null>) => {
            state.selectedActivity = action.payload;
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
            .addCase(createActivity.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createActivity.fulfilled, (state, action: PayloadAction<ActivityReceive>) => {
                state.status = "succeeded";
                state.originalProjectData.push(action.payload);
                state.selectedActivity = action.payload;
                state.error = null;
            })
            .addCase(createActivity.rejected, (state, action) => {
                state.status = "failed";
                // state.error = action.payload || "Erreur lors de la création de l'activité.";
            })
            .addCase(updateActivity.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateActivity.fulfilled, (state, action: PayloadAction<ActivityReceive>) => {
                state.status = "succeeded";
                const index = state.originalProjectData.findIndex(a => a.id === action.payload.id);
                if (index !== -1) {
                    state.originalProjectData[index] = action.payload;
                }
                state.selectedActivity = action.payload;
                state.error = null;
            })
            .addCase(updateActivity.rejected, (state, action) => {
                state.status = "failed";
                // state.error= action.payload || "Erreur lors de la mise à jour de l'activité.";
            });
    }
});

export const { setAddFormValue,setEditFormValue ,setFormField, resetForm, setSelectedActivity } = ActivitySlice.actions;

export default ActivitySlice.reducer;