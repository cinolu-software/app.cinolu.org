import {createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {
    ProgramsCategoryType,
    InitialStateCategoryType,
    CreateCategoryType, UpdateCategoryType
} from '@/Types/Programs/ProgramsCategoryType';

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
    const response = await axiosInstance.get(`${apiBaseUrl}/program-categories`);
    return response.data.data;
});

export const createCategory = createAsyncThunk('programsCategory/createCategory', async (category: CreateCategoryType) => {
    const response = await axiosInstance.post(`${apiBaseUrl}/program-categories`, category);
    return response.data;
});

export const updateCategory = createAsyncThunk('programsCategory/updateCategory', async (category: UpdateCategoryType) => {
    const response = await axiosInstance.put(`${apiBaseUrl}/program-categories/${category.id}`, category);
    return response.data;
});

export const deleteCategory = createAsyncThunk('programsCategory/deleteCategory', async (id: number) => {
    await axiosInstance.delete(`${apiBaseUrl}/program-categories/${id}`);
    return id;
});


const ProgramCategorySlice = createSlice({
    name: 'programsCategory',
    initialState,
    reducers: {
        toggleFilter: (state) => {
            state.filterToggle = !state.filterToggle;
        },
        setModalCreateCategory: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateCategory = action.payload.isOpen;
        },
        setModalEditCategory: (state, action: PayloadAction<{ isOpen: boolean, programCategory: any }>) => {
            state.isOpenModalEditCategory = action.payload.isOpen;
            state.selectedCategory = action.payload.programCategory;
        },
        setModalDeleteCategory: (state, action: PayloadAction<{ isOpen: boolean, programCategory: any }>) => {
            state.isOpenModalDeleteCategory = action.payload.isOpen;
            state.selectedCategory = action.payload.programCategory;
        }
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
    }

});

export const {
    toggleFilter,
    setModalCreateCategory,
    setModalEditCategory,
    setModalDeleteCategory
} = ProgramCategorySlice.actions;

export default ProgramCategorySlice.reducer


