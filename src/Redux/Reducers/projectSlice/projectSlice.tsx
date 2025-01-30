import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {CreateProjectType, FormValueType, InitialStateProjectType, ReceiveProjectType, UpdateProjectType} from "@/Types/Projects/ProjectType";
import {ShowError} from "@/utils/MultiStepForm.service";
import {RootState} from "@/Redux/Store";

const initialState : InitialStateProjectType = {
    originalProjectData: [],
    publishedProjectData: [],
    status: "idle",
    publishedProjectStatus: "idle",
    error: null,
    isOpenModalCreateProject: false,
    isOpenModalEditProject: false,
    isOpenModalDeleteProject: false,
    filterToggle: false,
    selectedProject: null,
    projectData: null,
    navId: 1,
    tabId: 1,
    formValue: {
        id: "",
        name: "",
        description: "",
        program: "",
        aim: "",
        prize: "",
        town: "",
        targeted_audience: '',
        started_at: "",
        ended_at: "",
        types: [],
        categories: [],
        partners: [],
    },
    EditFormValue: {
        id: "",
        name: "",
        description: "",
        program: "",
        aim: "",
        prize: "",
        town: "",
        targeted_audience: '',
        started_at: "",
        ended_at: "",
        types: [],
        requirements: [],
        partners: [],
        report: []
    },
    numberLevel:1,
    showFinish:false,
};

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
    const response = await axiosInstance.get<{ data: any }>(`${apiBaseUrl}/projects`)
    const originalProjects = response.data.data;
    return { original: originalProjects };
});

export const fetchPublishedProject = createAsyncThunk('projects/fetchPublishedProjects', async () => {
    const response = await axiosInstance.get<{ data: any }>(`${apiBaseUrl}/projects/find-published`)
    const publishedProject = response.data.data.projects;
    return { publishedProject: publishedProject };
});

export const fetchProjectById = createAsyncThunk<ReceiveProjectType, string, { rejectValue: any }>('projects/fetchProjectById', async (projectId, thunkAPI) => {
    try {
        const response = await axiosInstance.get<{ data: ReceiveProjectType }>(`${apiBaseUrl}/projects/${projectId}`);
        return response.data.data;
    }
    catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const createProject = createAsyncThunk<ReceiveProjectType, CreateProjectType, { rejectValue: any }>(
    'project/createProject',
    async (newProject, thunkAPI) => {
        try {
            const response = await axiosInstance.post<{ data: ReceiveProjectType }>(`${apiBaseUrl}/projects`, newProject);
            return response.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const updateProject = createAsyncThunk<ReceiveProjectType, { projectId: string, updatedProject: UpdateProjectType }, { rejectValue: any }>( 'project/updateProject', async ({ projectId, updatedProject }, thunkAPI) => {
        try {
            const response = await axiosInstance.patch<{ data: ReceiveProjectType }>(`${apiBaseUrl}/projects/${projectId}`, updatedProject);
            return response.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const deleteProject = createAsyncThunk<{ id: string }, string, { rejectValue: any }>('project/deleteProject', async (projectId, thunkAPI) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/projects/${projectId}`);
            return { id: projectId };
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const updatedAttachmentProjectImage = createAsyncThunk<{ projectId: string ; imageUrl: string }, { projectId: string; imageFile: File },{ rejectValue: any }>
('project/updateAttachmentProjectImage', async ({ projectId, imageFile }, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('thumb', imageFile);
            const response = await axiosInstance.post<{ data: { image: string } }>(
                `${apiBaseUrl}/projects/image/${projectId}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return { projectId, imageUrl: response.data.data.image };
        }
        catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const publishProject = createAsyncThunk<ReceiveProjectType, { projectId: string }, { rejectValue: any }>(
    'project/publishProject',
    async ({ projectId }, thunkAPI) => {
        try {
            const response = await axiosInstance.post<{ data: ReceiveProjectType }>(`${apiBaseUrl}/projects/publish/${projectId}`);
            return response.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const validateStep = (state: InitialStateProjectType) => {
    const { name, description, town, aim, prize, started_at, ended_at, types, categories, partners, targeted_audience, program } = state.formValue;
    switch (state.numberLevel) {
        case 1:
            if (!name || !description || !targeted_audience || !town || !aim || !prize) {
                ShowError();
                return false;
            }
            break;
        case 2:
            if (!name || !description || !targeted_audience || !town || !aim || !prize || !program) {
                ShowError();
                return false;
            }
            break;
        case 3:
            if (!name || !description || !targeted_audience || !town || !aim || !prize || !program || !started_at || !ended_at) {
                ShowError();
                return false;
            }
            break;
        case 4:
            if (!name || !description || !targeted_audience || !town || !aim || !prize  || !program || !started_at || !ended_at || types.length === 0) {
                ShowError();
                return false;
            }
            break;
        case 5 :
            if (!name || !description || !targeted_audience || !town || !aim || !prize || !program || !started_at || !ended_at || types.length === 0 || categories.length === 0) {
                ShowError();
                return false;
            }
            break;

        case 6 :
            if (!name || !description || !targeted_audience || !town || !aim || !prize || !program || !started_at || !ended_at || types.length === 0 || categories.length === 0 || partners.length === 0) {
                ShowError();
                return false;
            }

            break;
    }
    return true;
};

const ProjectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setSelectedProject: (state, action: PayloadAction<{ project: ReceiveProjectType | null }>) => {
            state.selectedProject = action.payload.project;
            if (action.payload.project) {
                state.EditFormValue = {
                    name: action.payload.project.name,
                    description: action.payload.project.description,
                    targeted_audience: action.payload.project.targeted_audience,
                    started_at: action.payload.project.started_at,
                    ended_at: action.payload.project.ended_at,
                    types: action.payload.project.types || [],
                    categories: action.payload.project.categories || [],
                    partners: action.payload.project.partners || []
                };
            }
        },
        setModalCreateProject: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateProject = action.payload.isOpen;
        },
        setModalEditProject: (state, action: PayloadAction<{ isOpen: boolean, project: ReceiveProjectType | null }>) => {
            state.isOpenModalEditProject = action.payload.isOpen;
            state.selectedProject = action.payload.project;
        },
        setModalDeleteProject: (state, action: PayloadAction<{ isOpen: boolean, project: ReceiveProjectType | null }>) => {
            state.isOpenModalDeleteProject = action.payload.isOpen;
            state.selectedProject = action.payload.project;
        },
        setNavId: (state, action: PayloadAction<number>) => {
            state.navId = action.payload;
        },
        setTabId: (state, action: PayloadAction<number>) => {
            state.tabId = action.payload;
        },
        setFormValue: (state, action: PayloadAction<{ field: keyof FormValueType, value: any }>) => {
            if (action.payload.field === 'types' && typeof action.payload.value === 'string') {
                //@ts-ignore
                state.formValue.types = JSON.parse(action.payload.value).map((type: string) => parseInt(type));
            } else {
                //@ts-ignore
                state.formValue[action.payload.field] = action.payload.value;
            }
        },
        setEditFormValue: (state, action: PayloadAction<{ field: keyof FormValueType, value: any }>) => {
            if (action.payload.field === 'types' && typeof action.payload.value === 'string') {
                //@ts-ignore
                state.EditFormValue.types = JSON.parse(action.payload.value).map((type: string) => parseInt(type));
            } else {
                //@ts-ignore
                state.EditFormValue[action.payload.field] = action.payload.value;
            }
        },
        setNewFormValue: (state, action: PayloadAction<{ field: keyof FormValueType, value: any }>) => {
            const { field, value } = action.payload;
            if (field === 'types' && typeof value === 'string') {
                state.formValue.types = JSON.parse(value).map((type: string) => parseInt(type));
            }
            else if (field === 'started_at' || field === 'ended_at') {
                state.formValue[field] = new Date(value).toISOString().split("T")[0];
            }
            else {
                state.formValue[field] = value;
            }
        },
        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        },
        setShowFinish: (state,action) => {
            state.showFinish = action.payload
        },
        handleBackButton: (state) => {
            if (state.numberLevel > 1) {
                state.numberLevel--;
            }
        },
        handleNextButton: (state) => {
            const isValid = validateStep(state);
            if (isValid) {
                if (state.numberLevel < 7) {
                    state.numberLevel++;
                } else if( state.numberLevel === 7) {
                    state.showFinish = true;
                }
            }
        },
        resetFormValue: (state) => {
            state.formValue = {
                id: "",
                name: "",
                description: "",
                program: "",
                aim: "",
                prize: "",
                town: "",
                targeted_audience: '',
                started_at: "",
                ended_at: "",
                types: [],
                categories: [],
                partners: []
            },
            state.numberLevel=1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<{ original: ReceiveProjectType[] }>) => {
                state.status = 'succeeded';
                state.originalProjectData = action.payload.original;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchPublishedProject.pending, (state)=>{
                state.publishedProjectStatus = 'loading';
                state.error = null;
            })
            .addCase(fetchPublishedProject.fulfilled, (state, action: PayloadAction<{publishedProject: ReceiveProjectType[]}>)=>{
                state.publishedProjectStatus = 'succeeded';
                state.publishedProjectData = action.payload.publishedProject;
            })
            .addCase(fetchPublishedProject.rejected, (state, action)=>{
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(createProject.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProject.fulfilled, (state, action: PayloadAction<ReceiveProjectType>) => {
                state.status = 'succeeded';
                state.originalProjectData.push(action.payload);
            })
            .addCase(createProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(updateProject.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProject.fulfilled, (state, action: PayloadAction<ReceiveProjectType>) => {
                state.status = 'succeeded';
                const updatedProject = action.payload;
                const existingProject = state.originalProjectData.find((project) => project.id === updatedProject.id);
                if (existingProject) {
                    Object.assign(existingProject, updatedProject);
                }
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(deleteProject.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProject.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
                state.status = 'succeeded';
                state.originalProjectData = state.originalProjectData.filter(
                    (project) => project.id !== action.payload.id
                );
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(updatedAttachmentProjectImage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updatedAttachmentProjectImage.fulfilled, (state, action: PayloadAction<{ projectId: string; imageUrl: string }>) => {
                state.status = 'succeeded';
                const event = state.originalProjectData.find((project) => project.id === action.payload.projectId);
                if (event) {
                    event.image = action.payload.imageUrl;
                }
            })
            .addCase(updatedAttachmentProjectImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchProjectById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProjectById.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.projectData = action.payload;
            })
            .addCase(fetchProjectById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const {
    setModalCreateProject,
    setModalEditProject,
    setModalDeleteProject,
    setNavId,
    setFormValue,
    setNewFormValue,
    setEditFormValue,
    setFilterToggle,
    setSelectedProject,
    setShowFinish,
    handleBackButton,
    handleNextButton,
    resetFormValue
} = ProjectSlice.actions;

export const selectSelectedProject = (state: RootState) => state.project.selectedProject;

export default ProjectSlice.reducer;
