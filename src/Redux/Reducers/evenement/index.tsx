import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import {InitialStateEvenementType, formValueType, EvenementType, } from "@/Types/evenement";
import axiosInstance, { apiBaseUrl } from "@/services/axios";


const initialFormValue: formValueType = {
    name: "",
    link: "",
    responsible: "",
    place: "",
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
    isOpenModalCreateEvenement: false,
    isOpenModalDeleteEvenement: false,
    isOpenModalEditEvenement: false,
    status: "idle",
    statusFetchPublishedEvenements: 'idle',
    statusFetchEvenementById: 'idle',
    filterToggle: false,
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

export const fetchEvenements = createAsyncThunk<EvenementType[], void, {rejectValue: any}>(
    'evenements/fetchEvenements',
    async(_, thunkAPI) => {
        try{
            const response = await axiosInstance.get(`${apiBaseUrl}/events`);
            return response.data.data as EvenementType[];
        } catch(error: any){
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement des événement");
        }
    }
);


export const fetchPublishedEvenements = createAsyncThunk<EvenementType[], void, {rejectValue: any}>(
    'evenements/fetchPublishedEvenements',
    async(_, thunkAPI)=>{
        try{
            const response = await axiosInstance.get(`${apiBaseUrl}/events/find-published`);
            return response.data.data as EvenementType[];
        } catch (error: any){
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement des événement publiés")
        }
    }
);


export const fetchEvenementById = createAsyncThunk<EvenementType, string, {rejectValue: any}>(
    'evenements/fetchEvenementById',
    async(evenementId, thunkAPI) => {
        try{
            const response = await axiosInstance.get(`${apiBaseUrl}/events/${evenementId}`);
            return response.data.data as  EvenementType;
        } catch (error : any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Erreur lors du chargement.')
        }
    }
)

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

export const publishUnpublishEvenement = createAsyncThunk<EvenementType, {evenementId: string}, {rejectValue: any} >(
    'evenement/publishUnpublishEvenement',
    async({evenementId}, thunkAPI)=>{
        try{
            const response = await axiosInstance.post(`${apiBaseUrl}/events/publish/${evenementId}`);
            return response.data.data as EvenementType;
        }catch(error: any){
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors de la publication jour.");
        }
    }
);


export const deleteEvenement = createAsyncThunk<{id: string}, string, {rejectValue: any}>(
    'evenements/deleteEvenement',
    async (evenementId, thunkAPI)=>{
        try{
            await axiosInstance.delete(`${apiBaseUrl}/events/${evenementId}`);
            return {id: evenementId};
        }catch (error: any){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);


export const updatedAttachmentEvenementImage = createAsyncThunk<{evenementId: string ; imageUrl: string}, {evenementId: string; imageFile: File}, {rejectValue: any}>(
    'evenements/updateEvenementImage',
    async({evenementId, imageFile}, thunkAPI)=>{
        try{
            const formData = new FormData();

            formData.append('cover', imageFile);

            const response = await axiosInstance.post<{data: {image: string}}>(
                `${apiBaseUrl}/events/cover/${evenementId}`,
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            )

            return {evenementId, imageUrl: response.data.data.image}
        }
        catch (error : any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const EvenementSlice = createSlice({
    name: "EvenementSlice",
    initialState,
    reducers: {

        setAddFormValue: (state, action: PayloadAction<{ field: keyof formValueType; value: any }>) => {
            const { field, value } = action.payload;
            if ((field === "started_at" || field === "ended_at") && value) {
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                    state.addFormValue[field] = date.toISOString().split("T")[0];
                } else {
                    state.addFormValue[field] = "";
                }
            } else {
                state.addFormValue[field] = value;
            }
        },

        setEditFormValue: (state, action: PayloadAction<{ field: keyof formValueType; value: any }>) => {
            const { field, value } = action.payload;
            if ((field === "started_at" || field === "ended_at") && value) {
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                    state.editFormValue[field] = date.toISOString().split("T")[0];
                } else {
                    state.editFormValue[field] = ""; 
                }
            } else {
                state.editFormValue[field] = value;
            }
        },      

        resetForm: (state) => {
            state.addFormValue = { ...initialFormValue };
            state.editFormValue = { ...initialFormValue };
        },
        setSelectedEvenement : (state, action: PayloadAction<EvenementType | null>) => {
            state.selectedEvenement = action.payload;
        },
        setModalCreateEvenement : (state, action : PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateEvenement = action.payload.isOpen;
        },
        setModalDeleteEvenement : (state, action: PayloadAction<{ isOpen: boolean, evenement: EvenementType | null }>) => {
            state.isOpenModalDeleteEvenement = action.payload.isOpen;
            state.selectedEvenement = action.payload.evenement;
        },
        setModalEditEvenement : (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalEditEvenement = action.payload.isOpen;
        },
        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(deleteEvenement.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteEvenement.fulfilled, (state, action: PayloadAction<{id: string}>) => {
                state.status = "succeeded";
                state.originalProjectData = state.originalProjectData.filter(evenement => evenement.id !== action.payload.id);
                state.publishedProjectData = state.publishedProjectData.filter(evenement => evenement.id !== action.payload.id);
                if (state.selectedEvenement && state.selectedEvenement.id === action.payload.id) {
                    state.selectedEvenement = null;
                }
            })
            .addCase(deleteEvenement.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ? action.payload : "Erreur lors de la suppression de l'événement";
            })


            .addCase(fetchEvenements.pending, (state)=>{
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchEvenements.fulfilled, (state, action: PayloadAction<EvenementType[]>)=>{
                state.status = "succeeded";
                // state.originalProjectData = action.payload.filter(evenement => !evenement.is_published);
                state.originalProjectData = action.payload;
            })
            .addCase(fetchEvenements.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ? action.payload : "Erreur lors du chargement des événements"
            })

            .addCase(fetchPublishedEvenements.pending, (state)=>{
                state.statusFetchPublishedEvenements = "loading";
                state.error = null;
            })
            .addCase(fetchPublishedEvenements.fulfilled, (state, action: PayloadAction<EvenementType[]>)=>{
                state.statusFetchPublishedEvenements = "succeeded";
                state.publishedProjectData = action.payload;
            })
            .addCase(fetchPublishedEvenements.rejected, (state, action) => {
                state.statusFetchPublishedEvenements = "failed";
                state.error = action.payload ? action.payload : "Erreur lors du chargement des événement publiés.";
            })
            .addCase(fetchEvenementById .pending, (state, action) => {
                state.statusFetchEvenementById = 'loading';
                state.selectedEvenement = null;
            })
            .addCase(fetchEvenementById.fulfilled, (state, action: PayloadAction<EvenementType>)=>{
                state.statusFetchEvenementById = "succeeded";
                state.selectedEvenement = action.payload;
            })
            .addCase(fetchEvenementById.rejected, (state, action)=>{
                state.statusFetchEvenementById = "failed";
                state.selectedEvenement= null;
                state.error = action.payload ? action.payload : "Erreur lors du chargement de l'événement"
            })

            .addCase(publishUnpublishEvenement.pending, (state, action) => {
                state.statusFetchPublishedEvenements = "loading";
            })
            .addCase(publishUnpublishEvenement.fulfilled, (state, action : PayloadAction<EvenementType>)=>{
                state.statusFetchPublishedEvenements = 'succeeded';
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
            .addCase(publishUnpublishEvenement.rejected, (state)=>{
                state.statusFetchPublishedEvenements = "failed";
                state.error =  null
            })
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
            })

            .addCase(updatedAttachmentEvenementImage.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updatedAttachmentEvenementImage.fulfilled, (state, action: PayloadAction<{evenementId: string; imageUrl: string}>) => {
                state.status = "succeeded";
                const { evenementId, imageUrl } = action.payload;

                const originalIndex = state.originalProjectData.findIndex(evenement => evenement.id === evenementId);

                if( originalIndex !== -1) {
                    state.originalProjectData[originalIndex].cover = imageUrl;
                }

                const publishedIndex = state.publishedProjectData.findIndex(evenement => evenement.id === evenementId);

                if(publishedIndex !== -1) {
                    state.publishedProjectData[publishedIndex].cover = imageUrl;
                }

                if(state.selectedEvenement && state.selectedEvenement.id === evenementId) {
                    state.selectedEvenement = {
                        ...state.selectedEvenement,
                        cover: imageUrl
                    }
                }

            })
            .addCase(updatedAttachmentEvenementImage.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ? action.payload : "Erreur lors de la mise à jour de l'image.";
            })
    }
});

export const { setAddFormValue, resetForm, setEditFormValue, setSelectedEvenement, setModalDeleteEvenement, setModalCreateEvenement, setModalEditEvenement} = EvenementSlice.actions;

export default EvenementSlice.reducer;