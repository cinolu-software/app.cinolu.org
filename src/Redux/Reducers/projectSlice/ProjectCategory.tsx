import {createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {
    ProjectCategoryType,
    InitialStateCategoryType,
    CreateCategoryType, UpdateCategoryType
} from '@/Types/Projects/ProjectCategoryType';

const initialState: InitialStateCategoryType = {
    projectCategoryData: [],
    status: 'idle',
    filterToggle: false,
    isOpenModalCreateCategory: false,
    isOpenModalEditCategory: false,
    isOpenModalDeleteCategory: false,
    selectedCategory: null,
    loading: false,
    error: '',
};

export const fetchCategory = createAsyncThunk('projectCategory/fetchCategory', async () => {
    const response = await axiosInstance.get(`${apiBaseUrl}/project-categories`);
    return response.data.data;
});

export const createCategory = createAsyncThunk('projectCategory/createCategory', async (category: CreateCategoryType) => {
    const response = await axiosInstance.post(`${apiBaseUrl}/program-categories`, category);
    return response.data;
});

export const updateCategory = createAsyncThunk('programsCategory/updateCategory', async (category: UpdateCategoryType) => {
    const response = await axiosInstance.patch(`${apiBaseUrl}/project-categories/${category.id}`, category);
    return response.data.data;
});

export const deleteCategory = createAsyncThunk('projectCategory/deleteCategory', async (id: string) => {
    await axiosInstance.delete(`${apiBaseUrl}/project-categories/${id}`);
    return id;
});


const ProgramCategorySlice = createSlice({
    name: 'projectCategory',
    initialState,
    reducers: {
        toggleFilter: (state) => {
            state.filterToggle = !state.filterToggle;
        },
        setModalCreateCategory: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateCategory = action.payload.isOpen;
        },
        setModalEditCategory: (state, action: PayloadAction<{ isOpen: boolean, projectCategory: any }>) => {
            state.isOpenModalEditCategory = action.payload.isOpen;
            state.selectedCategory = action.payload.projectCategory;
        },
        setModalDeleteCategory: (state, action: PayloadAction<{ isOpen: boolean, projectCategory: any }>) => {
            state.isOpenModalDeleteCategory = action.payload.isOpen;
            state.selectedCategory = action.payload.projectCategory;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projectCategoryData = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || '';
            })
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.projectCategoryData.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || '';
            })
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action: PayloadAction<UpdateCategoryType>) => {
                state.loading = false;
                state.status = 'succeeded';
                const { id, name, created_at, updated_at } = action.payload;


                if (id) {
                    const index = state.projectCategoryData.findIndex((project) => project.id === id);

                    if (index !== -1) {
                        state.projectCategoryData[index] = {
                            ...state.projectCategoryData[index],
                            ...(name !== null && { name }),
                            ...(created_at && { created_at }),
                            ...(updated_at && { updated_at }),
                        };

                    }
                }
            })
            .addCase(deleteCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>)=>{
                state.status = 'succeeded';
                state.projectCategoryData = state.projectCategoryData.filter((program: {id : string}) => program.id !== action.payload)
            })
            .addCase(deleteCategory.rejected, (state) => {
                state.status = 'failed';
                state.error = 'Something went wrong';
            });
    }

});

export const {
    toggleFilter,
    setModalCreateCategory,
    setModalEditCategory,
    setModalDeleteCategory
} = ProgramCategorySlice.actions;

export default ProgramCategorySlice.reducer


