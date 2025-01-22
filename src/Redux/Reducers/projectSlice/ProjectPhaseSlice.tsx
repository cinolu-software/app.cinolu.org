import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {InitialStateProjectPhaseType, ProjectPhaseType, CreateProjectPhaseType, FormValue} from "@/Types/Projects/PhasesType";

const initialState: InitialStateProjectPhaseType = {
    ProjectDataPhase: [],
    dataPhase: null,
    status: 'idle',
    statusPhase: 'idle',
    error: null,
    isOpenModalCreateProjectPhase : false,
    isOpenModalDeleteProjectPhase : false,
    isOpenModalEditProjectPhase : false,
    selectedProjectPhase: null,
    formValue : {
        name : '',
        description: '',
        started_at: '',
        ended_at: '',
        project: ''
    },
}

export const fetchProjectPhase = createAsyncThunk('project/fetchProjectPhase', async () => {
    const response = await axiosInstance.get<{data: ProjectPhaseType[]}>(`${apiBaseUrl}/project-phases`);
    return {data : response.data.data}
});

export const fetchProjectPhaseById = createAsyncThunk('project/fetchProjectPhaseById', async (id: string) => {
    const response = await axiosInstance.get<{data: ProjectPhaseType}>(`${apiBaseUrl}/project-phases/${id}`);
    return response.data.data;
});

export const createProjectPhase = createAsyncThunk('project/createProjectPhase', async(newProjectPhase: CreateProjectPhaseType)=>{
    try{
        const response = await axiosInstance.post<{data: ProjectPhaseType}>(`${apiBaseUrl}/project-phases`, newProjectPhase);
        return response.data.data;
    }catch(err: any){
        return "Erreur survenue lors de la création de la phase"
    }
})

export const updateProjectPhase = createAsyncThunk('project/updateProjectPhase', async (updatedProjectPhase: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch<{ data: ProjectPhaseType }>(
                `${apiBaseUrl}/project-phases/${updatedProjectPhase.id}`,
                updatedProjectPhase
            );
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue("Erreur survenue lors de la mise à jour de la phase");
        }
    }
);

export const deleteProjectPhase = createAsyncThunk('project/deleteProjectPhase', async (id: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/project-phases/${id}`);
            return id;
        } catch (err: any) {
            return rejectWithValue("Erreur survenue lors de la suppression de la phase");
        }
    }
);

const ProjectPhaseSlice = createSlice({
    name: 'projectPhase',
    initialState,
    reducers: {
        setSelectedProjectPhase : (state, action: PayloadAction<any> | null)=>{
            state.selectedProjectPhase = action?.payload.programPhase;
        },
        setModalcreateProjectPhase: (state, action: PayloadAction<{isOpen: boolean}>) => {
            state.isOpenModalCreateProjectPhase = action.payload.isOpen;
        },
        setModalEditProjectPhase: (state, action: PayloadAction<{isOpen: boolean, projectPhase: ProjectPhaseType | null }>) => {
            state.isOpenModalEditProjectPhase = action.payload.isOpen;
            state.selectedProjectPhase = action.payload.projectPhase;
        },
        setModalDeleteProjectPhase: (state, action: PayloadAction<{isOpen: boolean, projectPhase: ProjectPhaseType | null}>) => {
            state.isOpenModalEditProjectPhase = action.payload.isOpen;
            state.selectedProjectPhase = action.payload.projectPhase;
        },
        setFormValue: (state, action: PayloadAction<{ field: keyof FormValue, value: string }>) => {
            const { field, value } = action.payload;
            if (field in state.formValue) {
                state.formValue[field as keyof FormValue] = value;
            } else {
                console.warn(`Le champ ${field} n'existe pas dans formValue.`);
            }
        },
        resetFormValue: (state) => {
            state.formValue = {
                name: '',
                description: '',
                started_at: '',
                ended_at: '',
                project: '',
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectPhase.pending, (state)=>{
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProjectPhase.fulfilled, (state, action: PayloadAction<{data: any}>) => {
                state.status = 'succeeded';
                state.ProjectDataPhase = action.payload.data
            })
            .addCase(fetchProjectPhase.rejected, (state)=>{
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProjectPhase.pending, (state)=>{
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProjectPhase.fulfilled, (state, action: PayloadAction<any>)=>{
                state.status = 'succeeded';
                state.ProjectDataPhase.push(action.payload);
            })
            .addCase(createProjectPhase.rejected, (state)=>{
                state.status = 'failed';
                state.error= "Something went wrong"
            })
            .addCase(updateProjectPhase.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProjectPhase.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                const index = state.ProjectDataPhase.findIndex(
                    (phase) => phase.id === action.payload.id
                );
                if (index !== -1) {
                    state.ProjectDataPhase[index] = action.payload;
                }
            })
            .addCase(updateProjectPhase.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(deleteProjectPhase.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteProjectPhase.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.ProjectDataPhase = state.ProjectDataPhase.filter(
                    (phase) => phase.id !== action.payload
                );
            })
            .addCase(deleteProjectPhase.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(fetchProjectPhaseById.pending, (state) => {
                state.statusPhase = 'loading';
                state.error = null;
            })
            .addCase(fetchProjectPhaseById.fulfilled, (state, action: PayloadAction<any>) => {
                state.statusPhase = 'succeeded';
                state.selectedProjectPhase = action.payload;
            })
            .addCase(fetchProjectPhaseById.rejected, (state, action) => {
                state.statusPhase = 'failed';
                state.error = action.payload as string;
            })

        ;
    }
});

export const {setModalcreateProjectPhase, setModalEditProjectPhase, setModalDeleteProjectPhase, setSelectedProjectPhase} = ProjectPhaseSlice.actions

export default ProjectPhaseSlice.reducer;

