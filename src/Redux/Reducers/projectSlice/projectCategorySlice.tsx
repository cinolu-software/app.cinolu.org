import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { apiBaseUrl } from "@/services/axios";
import { InitialStateCategoriesType, TransformedCategoriesType, CategoryType, CreateCategoryType } from "@/Types/Projects/category/CategoryType";
import { RootState } from "@/Redux/Store";

const initialState: InitialStateCategoriesType = {
    originalCategoriesData: [],
    transformedCategoriesData: [],
    status: "idle",
    error: null,
    isOpenModalCreateCategory: false,
    isOpenModalEditCategory: false,
    isOpenModalDeleteCategory: false,
    selectedCategories: null
};

const transformCategories = (categories: CategoryType[]): TransformedCategoriesType[] => {
    return categories.map(category => ({
        id: category.id,
        name: category.name,
        icon: "draft",
        badge: true,
        color: "success",
        image: "admin/roles/user_role.png",
        created_at: category.created_at,
        updated_at: category.updated_at
    }));
};

export const fetchCategory = createAsyncThunk<{ original: CategoryType[], transformed: TransformedCategoriesType[] }>(
    'categories/fetchCategory',
    async () => {
        const response = await axios.get<{ data: CategoryType[] }>(`${apiBaseUrl}/categories`);
        const originalCategories = response.data.data;
        const transformedCategories = transformCategories(originalCategories);
        return { original: originalCategories, transformed: transformedCategories };
    }
);

export const createCategory = createAsyncThunk<CategoryType, { name: string }>(
    'categories/createCategory',
    async (newCategory, { rejectWithValue }) => {
        try {
            const response = await axios.post<{ data: CategoryType }>(`${apiBaseUrl}/categories`, newCategory);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateCategory = createAsyncThunk<CategoryType, { id: number, name: string }>(
    'categories/updateCategory',
    async (updatedCategory, { rejectWithValue }) => {
        try {
            const response = await axios.patch<{ data: CategoryType }>(`${apiBaseUrl}/categories/${updatedCategory.id}`, { name: updatedCategory.name });
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteCategory = createAsyncThunk<number, number>(
    'categories/deleteCategory',
    async (categoryId, { rejectWithValue }) => {
        try {
            await axios.delete(`${apiBaseUrl}/categories/${categoryId}`);
            return categoryId;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

const CategorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setModalCreateCategory: (state, action: PayloadAction<boolean>) => {
            state.isOpenModalCreateCategory = action.payload;
        },
        setModalEditCategory: (state, action: PayloadAction<{ isOpen: boolean, category: CategoryType | null }>) => {
            state.isOpenModalEditCategory = action.payload.isOpen;
            state.selectedCategories = action.payload.category;
        },
        setModalDeleteCategory: (state, action: PayloadAction<{ isOpen: boolean, category: CategoryType | null }>) => {
            state.isOpenModalDeleteCategory = action.payload.isOpen;
            state.selectedCategories = action.payload.category;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCategory.fulfilled, (state, action: PayloadAction<{ original: CategoryType[], transformed: TransformedCategoriesType[] }>) => {
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
            .addCase(createCategory.fulfilled, (state, action: PayloadAction<CategoryType>) => {
                state.status = 'succeeded';
                state.originalCategoriesData.push(action.payload);
                state.transformedCategoriesData.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    icon: "draft",
                    badge: true,
                    color: "success",
                    image: "admin/roles/user_role.png",
                    created_at: action.payload.created_at,
                    updated_at: action.payload.updated_at
                });
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Something went wrong';
            })
            .addCase(updateCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action: PayloadAction<CategoryType>) => {
                state.status = 'succeeded';
                const index = state.originalCategoriesData.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.originalCategoriesData[index] = action.payload;
                    state.transformedCategoriesData[index] = {
                        id: action.payload.id,
                        name: action.payload.name,
                        icon: "draft",
                        badge: true,
                        color: "success",
                        image: "admin/roles/user_role.png",
                        created_at: action.payload.created_at,
                        updated_at: action.payload.updated_at
                    };
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Something went wrong';
            })
            .addCase(deleteCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = 'succeeded';
                state.originalCategoriesData = state.originalCategoriesData.filter(category => category.id !== action.payload);
                state.transformedCategoriesData = state.transformedCategoriesData.filter(category => category.id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Something went wrong';
            });
    },
});

export const selectCategoryStatus = (state: RootState) => state.projectCategory.status;
export const selectOriginalCategoryData = (state: RootState) => state.projectCategory.originalCategoriesData;
export const selectTransformedCategoryData = (state: RootState) => state.projectCategory.transformedCategoriesData;
export const selectCategoryError = (state: RootState) => state.projectCategory.error;
export const { setModalCreateCategory, setModalEditCategory, setModalDeleteCategory } = CategorySlice.actions;

export default CategorySlice.reducer;
