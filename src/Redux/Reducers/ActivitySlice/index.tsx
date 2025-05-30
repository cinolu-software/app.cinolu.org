import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import {formValueType,InitialStateActivityType,ActivityReceive,createActivityType} from "@/Types/ActivitiesTypes";
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
    isOpenModalCreateActivity: false,
    isOpenModalEditActivity: false,
    isOpenModalDeleteActivity: false,
    filterToggle: false,
    selectedActivity: null,
    status: "idle",
    fetchActivityByIdStatus: "idle",
    fetchPublishedStatus: "idle",
    addFormValue: { ...initialFormValue },
    editFormValue: { ...initialFormValue },
    numberLevel: 1,
    showFinish: false,
    error: null,
};

export const createActivity = createAsyncThunk<ActivityReceive,createActivityType,{ rejectValue: string }>(
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

export const updateActivity = createAsyncThunk<ActivityReceive,{ activityId: string; updatedActivity: createActivityType },{ rejectValue: string }>(
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

export const fetchActivityById = createAsyncThunk<ActivityReceive, string, {rejectValue: any}>('activity/fetchById',
    async (activityId, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/projects/${activityId}`);
            return response.data.data as ActivityReceive;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement.");
        }
    }
)

export const fetchActivities = createAsyncThunk<ActivityReceive[], void, {rejectValue: any}>(
    'activity/fetchActivities',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/projects`);
            return response.data.data as ActivityReceive[];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement des activités.");
        }
    }
);

export const fetchPublishedActivities = createAsyncThunk<ActivityReceive[], void, {rejectValue: any}>(
    'activity/fetchPublishedActivities',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/projects/find-published`);
            return response.data.data[0] as ActivityReceive[];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement des activités publiées.");
        }
    }
);


export const publishUnpublishActivity = createAsyncThunk<ActivityReceive, {activityId: string}, {rejectValue: any}>(
    'activity/publishActivity',
    async ({activityId}, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/projects/publish/${activityId}`);
            return response.data.data as ActivityReceive;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors de la publication de l'activité.");
        }
    }
);


export const deleteActivity = createAsyncThunk<{ id: string }, string, { rejectValue: any }>('activity/deleteActivity', async (activityId, thunkAPI) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/projects/${activityId}`);
            return { id: activityId };
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const updatedAttachmentActivityImage = createAsyncThunk<{ activityId: string ; imageUrl: string }, { activityId: string; imageFile: File },{ rejectValue: any }>
    ('activity/updateAttachmentActivityImage', async ({ activityId, imageFile }, thunkAPI) => {
        try {

            const formData = new FormData();

            formData.append('thumb', imageFile);

            const response = await axiosInstance.post<{ data: { image: string } }>(
                `${apiBaseUrl}/projects/image/${activityId}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            
            return { activityId, imageUrl: response.data.data.image };
        }
        catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
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
        },
        setModalCreateActivity: (state, action: PayloadAction<{isOpen: boolean}>) => {
            state.isOpenModalCreateActivity = action.payload.isOpen;
        },
        setModalEditActivity: (state, action: PayloadAction<{isOpen: boolean, activity: ActivityReceive | null}>) => {
            state.isOpenModalEditActivity = action.payload.isOpen;
            state.selectedActivity = action.payload.activity;
        },
        setModalDeleteActivity: (state, action: PayloadAction<{isOpen: boolean, activity: ActivityReceive | null}>) => {
            state.isOpenModalDeleteActivity = action.payload.isOpen;
            state.selectedActivity = action.payload.activity;
        },
        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivities.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchActivities.fulfilled, (state, action: PayloadAction<ActivityReceive[]>) => {
                state.status = "succeeded";
                state.originalProjectData = action.payload.filter(activity => !activity.is_published);
            })
            .addCase(fetchActivities.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ? action.payload : "Erreur lors du chargement des activités.";
            })


            .addCase(fetchPublishedActivities.pending, (state) => {
                state.fetchPublishedStatus = "loading";
                state.error = null;
            })
            .addCase(fetchPublishedActivities.fulfilled, (state, action: PayloadAction<ActivityReceive[]>) => {
                state.fetchPublishedStatus = "succeeded";
                state.publishedProjectData = action.payload;
            })
            .addCase(fetchPublishedActivities.rejected, (state, action) => {
                state.fetchPublishedStatus = "failed";
                state.error = action.payload ? action.payload : "Erreur lors du chargement des activités publiées.";
            })
            

            .addCase(publishUnpublishActivity.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(publishUnpublishActivity.fulfilled, (state, action: PayloadAction<ActivityReceive>) => {
               
                state.status = "succeeded";
                    
                    
                const originalIndex = state.originalProjectData.findIndex(a => a.id === action.payload.id);
                if (originalIndex !== -1) {
                    state.originalProjectData[originalIndex] = action.payload;
                } else {
                    state.originalProjectData.push(action.payload);
                }
                
                const publishedIndex = state.publishedProjectData.findIndex(a => a.id === action.payload.id);
                
                if (publishedIndex !== -1) {
                    state.publishedProjectData.splice(publishedIndex, 1);
                }
                    
                state.error = null;
            })
            .addCase(publishUnpublishActivity.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ? action.payload : "Erreur lors de la publication de l'activité.";
            })


            .addCase(createActivity.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createActivity.fulfilled, (state, action: PayloadAction<ActivityReceive>) => {
                state.status = "succeeded";
                state.originalProjectData.push(action.payload);
                state.error = null;
            })
            .addCase(createActivity.rejected, (state, action) => {
                state.status = "failed";
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
            })


            .addCase(fetchActivityById.pending, (state) => {
                state.fetchActivityByIdStatus = "loading";
                state.selectedActivity = null;
            })
            .addCase(fetchActivityById.fulfilled, (state, action: PayloadAction<ActivityReceive>) => {
                state.fetchActivityByIdStatus = "succeeded";
                state.selectedActivity = action.payload
            })
            .addCase(fetchActivityById.rejected, (state, action) => {
                state.fetchActivityByIdStatus = "failed";
                state.selectedActivity = null;
                state.error = action.payload ? action.payload : "Erreur lors du chargement de l'activité."
            })

            .addCase(deleteActivity.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteActivity.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
                state.status = "succeeded";
                state.originalProjectData = state.originalProjectData.filter(activity => activity.id !== action.payload.id);
                state.publishedProjectData = state.publishedProjectData.filter(activity => activity.id !== action.payload.id);
                state.selectedActivity = null;
            })
            .addCase(deleteActivity.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ? action.payload : "Erreur lors de la suppression de l'activité."
            })


            .addCase(updatedAttachmentActivityImage.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updatedAttachmentActivityImage.fulfilled, (state, action: PayloadAction<{ activityId: string; imageUrl: string }>) => {
                state.status = "succeeded";
                const { activityId, imageUrl } = action.payload;

                const originalIndex = state.originalProjectData.findIndex(a => a.id === activityId);
                if (originalIndex !== -1) {
                    state.originalProjectData[originalIndex].image = imageUrl;
                }

                const publishedIndex = state.publishedProjectData.findIndex(a => a.id === activityId);
                if (publishedIndex !== -1) {
                    state.publishedProjectData[publishedIndex].image = imageUrl;
                }

                if (state.selectedActivity && state.selectedActivity.id === activityId) {
                    state.selectedActivity = {
                        ...state.selectedActivity,
                        image: imageUrl
                    };
                }
            })
            .addCase(updatedAttachmentActivityImage.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ? action.payload : "Erreur lors de la mise à jour de l'image de l'activité."
            });
    }
});

export const { setAddFormValue,setEditFormValue ,setFormField, resetForm, setSelectedActivity, setModalCreateActivity, setModalDeleteActivity, setFilterToggle, setModalEditActivity } = ActivitySlice.actions;

export default ActivitySlice.reducer;