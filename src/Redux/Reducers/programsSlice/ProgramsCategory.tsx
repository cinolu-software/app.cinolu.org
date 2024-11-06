import {createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {ProgramsCategoryType, InitialStateCategoryType} from '@/Types/Programs/ProgramsCategoryType';

const initialState: InitialStateCategoryType = {
    programsCategoryData: [],
    status: 'idle',
    filterToggle: false,
    isOpenModalCreateCategory: false,
    isOpenModalEditCategory: false,
    isOpenModalDeleteCategory: false,
    selectedCategory: null,
    loading: false,
    error: '',
};

export const fetchCategory = createAsyncThunk('programsCategory/fetchCategory', async () => {
    const response = await axiosInstance.get(`${apiBaseUrl}/programs/category`);
    return response.data;
});

export const createCategory = createAsyncThunk('programsCategory/createCategory', async (category: ProgramsCategoryType) => {
    const response = await axiosInstance.post(`${apiBaseUrl}/programs/category`, category);
    return response.data;
});

export const updateCategory = createAsyncThunk('programsCategory/updateCategory', async (category: ProgramsCategoryType) => {
    const response = await axiosInstance.put(`${apiBaseUrl}/programs/category/${category.id}`, category);
    return response.data;
});

export const deleteCategory = createAsyncThunk('programsCategory/deleteCategory', async (id: number) => {
    await axiosInstance.delete(`${apiBaseUrl}/programs/category/${id}`);
    return id;
});


const ProgramCategory = createSlice({
    name: 'programsCategory',
    initialState,
    reducers: {
        toggleFilter: (state) => {
            state.filterToggle = !state.filterToggle;
        },
        openModalCreateCategory: (state) => {
            state.isOpenModalCreateCategory = true;
        },
        closeModalCreateCategory: (state) => {
            state.isOpenModalCreateCategory = false;
        },
        openModalEditCategory: (state, action: PayloadAction<ProgramsCategoryType>) => {
            state.isOpenModalEditCategory = true;
            state.selectedCategory = action.payload;
        },
        closeModalEditCategory: (state) => {
            state.isOpenModalEditCategory = false;
            state.selectedCategory = null;
        },
        openModalDeleteCategory: (state, action: PayloadAction<ProgramsCategoryType>) => {
            state.isOpenModalDeleteCategory = true;
            state.selectedCategory = action.payload;
        },
        closeModalDeleteCategory: (state) => {
            state.isOpenModalDeleteCategory = false;
            state.selectedCategory = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.programsCategoryData = action.payload;
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
                state.programsCategoryData.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || '';
            })
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                const newCategory = action.payload;
                const existingCategory = state.programsCategoryData.find(category => category.id === newCategory.id);
                if (existingCategory) {
                    existingCategory.name = newCategory.name;
                }
            })
})

