import {createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {InitialStatePostCategoryType, PostCategoryType, CreateCategoryType, UpdateCategoryType} from "@/Types/Blog/categoryPostType";

const initialState: InitialStatePostCategoryType = {
    postCategoryData: [],
    status: 'idle',
    filterToggle: false,
    isOpenModalCreateCategory: false,
    isOpenModalEditCategory: false,
    isOpenModalDeleteCategory: false,
    selectedCategory: null,
    loading: false,
    error: '',
};

export const fetchCategory = createAsyncThunk('postCategory/fetchCategory', async () => {
    const response = await axiosInstance.get(`${apiBaseUrl}/blog-categories`);
    return response.data.data;
});

export const createCategory = createAsyncThunk('postCategory/createCategory', async (category: CreateCategoryType) => {
    const response = await axiosInstance.post(`${apiBaseUrl}/blog-categories`, category);
    return response.data;
});

export const updateCategory = createAsyncThunk('postCategory/updateCategory', async (category: UpdateCategoryType) => {
    const response = await axiosInstance.patch(`${apiBaseUrl}/blog-categories/${category.id}`, category);
    return response.data.data;
});

export const deleteCategory = createAsyncThunk('postCategory/deleteCategory', async (id: string) => {
    await axiosInstance.delete(`${apiBaseUrl}/blog-categories/${id}`);
    return id;
});


const PostCategorySlice = createSlice({
    name: 'postCategory',
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
                state.postCategoryData = action.payload;
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
                state.postCategoryData.push(action.payload);
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
                    const index = state.postCategoryData.findIndex((project) => project.id === id);
                    if (index !== -1) {
                        state.postCategoryData[index] = {
                            ...state.postCategoryData[index],
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
                state.postCategoryData = state.postCategoryData.filter((program: {id : string}) => program.id !== action.payload)
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
} = PostCategorySlice.actions;

export default PostCategorySlice.reducer


