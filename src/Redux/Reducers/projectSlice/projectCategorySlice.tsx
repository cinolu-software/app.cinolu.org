import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { apiBaseUrl } from "@/services/axios";
import { InitialStateCategoryType, Category, TransformedCategory  } from "@/Types/Projects/ProjectsType";
import {RootState} from "@/Redux/Store";

const initialState: InitialStateCategoryType = {
    originalCategoriesData: [],
    transformedCategoriesData: [],
    status: "idle",
    error: null,
};

const transformCategories = (categories: Category[]): TransformedCategory[] => {
    return categories.map(category => ({
        title: category.name,
        icon: "draft",
        id: category.id.toString(),
        badge: true,
        color: "success",
    }));
};

export const fetchCategory = createAsyncThunk<{ original: Category[], transformed: TransformedCategory[] }>(
    'categories/fetchCategory',
    async () => {
        const response = await axios.get<{ data: Category[] }>(`${apiBaseUrl}/categories`);
        const originalCategories = response.data.data;
        const transformedCategories = transformCategories(originalCategories);
        return { original: originalCategories, transformed: transformedCategories };
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
            .addCase(fetchCategory.fulfilled, (state, action: PayloadAction<{ original: Category[], transformed: TransformedCategory[] }>) => {
                state.status = 'succeeded';
                state.originalCategoriesData = action.payload.original;
                state.transformedCategoriesData = action.payload.transformed;
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
                state.originalCategoriesData.push(action.payload);
                state.transformedCategoriesData.push({
                    title: action.payload.name,
                    icon: "draft",
                    id: action.payload.id.toString(),
                    badge: true,
                    color: "success",
                });
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Something went wrong';
            });
    },
});

export const selectCategoryStatus = (state: RootState) => state.projectCategory.status;
export const selectOriginalCategoryData = (state: RootState) => state.projectCategory.originalCategoriesData;
export const selectTransformedCategoryData = (state: RootState) => state.projectCategory.transformedCategoriesData;

export default CategorySlice.reducer;