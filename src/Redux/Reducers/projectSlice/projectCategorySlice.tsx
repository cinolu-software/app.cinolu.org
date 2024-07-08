import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import axios, { apiBaseUrl } from "@/services/axios";
import { InitialStateCategoryType, Category } from "@/Types/Projects/ProjectsType";
import {RootState} from "@/Redux/Store";

const initialState: InitialStateCategoryType = {
    categoriesData: [],
    status: "idle",
    error: null,
};

export const fetchCategory = createAsyncThunk<Category[]>(
    'categories/fetchCategory',
    async () => {
        const response = await axios.get<{ data: Category[] }>(`${apiBaseUrl}/categories`);
        return response.data.data;
    }
);

export const createCategory = createAsyncThunk<Category, { name: string }>(
    'categories/createCategory',
    async (newCategory, { rejectWithValue }) => {
        try {
            const response = await axios.post<{ data: Category }>(`${apiBaseUrl}/categories`, newCategory);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

const CategorySlice = createSlice({

    name: "categories",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCategory.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.status = 'succeeded';
                state.categoriesData = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(createCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.status = 'succeeded';
                state.categoriesData.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Something went wrong';
            });
    },
});

export const selectCategoryStatus = (state: RootState) => state.projectCategory.status;
export const fetchCategoryData = (state: RootState) => state.projectCategory.categoriesData;

export default CategorySlice.reducer;
