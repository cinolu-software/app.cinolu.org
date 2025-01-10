import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance , { apiBaseUrl } from "@/services/axios";
import { InitialStateProjectTypeType, ProjectTypeType, CreateProjectTypeType, TransformedProjectTypeType, UpdateTypeType } from "@/Types/Projects/ProjectTypeType";
import { RootState } from "@/Redux/Store";

const initialState: InitialStateProjectTypeType = {
    originalTypeProjectData: [],
    transformedProjectData: [],
    status: "idle",
    error: null,
    isOpenModalCreateProjectType: false,
    isOpenModalEditProjectType: false,
    isOpenModalDeleteProjectType: false,
    selectedProjectType: null
};

const transformProjectType = (types: ProjectTypeType[]): TransformedProjectTypeType[] => {
    return types.map(type => {
        if (type.id === undefined) {
            throw new Error("Project type must have an id");
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

export const fetchProjectType = createAsyncThunk(
    'project/fetchProjectType',
    async () => {
        const response = await axiosInstance.get<{ data: ProjectTypeType[] }>(`${apiBaseUrl}/project-types`);
        const originalProjectTypes = response.data.data;
        const transformedProject = transformProjectType(originalProjectTypes);
        return { original: originalProjectTypes, transformed: transformedProject };
    }
);

export const createProjectType = createAsyncThunk(
    'project/createProjectType',
    async (newProjectType: CreateProjectTypeType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<{ data: ProjectTypeType }>(`${apiBaseUrl}/project-types`, newProjectType);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateProjectType = createAsyncThunk(
    'project/updateProjectType',
    async (updatedProjectType: UpdateTypeType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch<{ data: UpdateTypeType }>(`${apiBaseUrl}/project-types/${updatedProjectType.id}`, updatedProjectType);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteProjectType = createAsyncThunk(
    'project/deleteProjectType',
    async (projectTypeId: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/project-types/${projectTypeId}`);
            return projectTypeId;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

const ProjectTypeSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setModalCreateProjectTypes: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateProjectType = action.payload.isOpen;
        },
        setModalEditProjectTypes: (state, action: PayloadAction<{ isOpen: boolean, projectType: ProjectTypeType | null }>) => {
            state.isOpenModalEditProjectType = action.payload.isOpen;
            state.selectedProjectType = action.payload.projectType;
        },
        setModalDeleteProjectTypes: (state, action: PayloadAction<{ isOpen: boolean, projectType: ProjectTypeType | null }>) => {
            state.isOpenModalDeleteProjectType = action.payload.isOpen;
            state.selectedProjectType = action.payload.projectType;
        },
        resetProjectTypeState: (state) => {
            state.selectedProjectType = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProjectType.fulfilled, (state, action: PayloadAction<{ original: ProjectTypeType[], transformed: TransformedProjectTypeType[] }>) => {
                state.status = 'succeeded';
                state.originalTypeProjectData = action.payload.original;
                state.transformedProjectData = action.payload.transformed;
            })
            .addCase(fetchProjectType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(createProjectType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProjectType.fulfilled, (state, action: PayloadAction<ProjectTypeType>) => {
                state.status = 'succeeded';
                state.originalTypeProjectData.push(action.payload);

                if (action.payload.id === undefined) {
                    throw new Error("New program type must have an id");
                }

                state.transformedProjectData.push({
                    id: action.payload.id,
                    name: action.payload.name || "",
                    description: action.payload.description || "",
                    created_at: action.payload.created_at || "",
                    updated_at: action.payload.updated_at || "",
                    image: "programs/types/typeProgram.png"
                });
            })
            .addCase(createProjectType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(updateProjectType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProjectType.fulfilled, (state, action: PayloadAction<UpdateTypeType>) => {
                state.status = 'succeeded';
                const index = state.originalTypeProjectData.findIndex((program: { id: string }) => program.id === action.payload.id);
                if (index !== -1) {
                    state.originalTypeProjectData[index] = action.payload;
                    // @ts-ignore
                    state.transformedProgramsData[index] = {
                        ...action.payload,
                        image: "programs/types/typeProgram.png"
                    };
                }
            })
            .addCase(updateProjectType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(deleteProjectType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteProjectType.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.originalTypeProjectData = state.originalTypeProjectData.filter((project: { id: string; }) => project.id !== action.payload);
                state.transformedProjectData = state.transformedProjectData.filter(project => project.id !== action.payload);
            })
            .addCase(deleteProjectType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const { setModalCreateProjectTypes, setModalEditProjectTypes, setModalDeleteProjectTypes } = ProjectTypeSlice.actions;
export const selectProjectTypeStatus = (state: RootState) => state.projectType.status;
export const selectOriginalProjectData = (state: RootState) => state.projectType.originalTypeProjectData;
export const selectTransformedProjectDataType = (state: RootState) => state.projectType.transformedProjectData;

export default ProjectTypeSlice.reducer;