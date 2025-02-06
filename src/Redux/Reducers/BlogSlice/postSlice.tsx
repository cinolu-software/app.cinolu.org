import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import { InitialStatePost, Post, UpdatePost, CreatePost } from "@/Types/Blog/postType";
import { RootState } from "@/Redux/Store";

const initialState: InitialStatePost = {
    postData: [],
    status: "idle",
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${apiBaseUrl}/blog-posts`);
        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erreur lors de la récupération des posts");
    }
});

export const fetchPostById = createAsyncThunk("posts/fetchPostById", async (id: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${apiBaseUrl}/blog-posts/${id}`);
        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erreur lors de la récupération du post");
    }
});

export const createPost = createAsyncThunk("posts/createPost", async (newPost: CreatePost, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${apiBaseUrl}/blog-posts`, newPost);
        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erreur lors de la création du post");
    }
});

export const updatePost = createAsyncThunk("posts/updatePost", async (updatedPost: UpdatePost, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.patch(`/blog-posts/${updatedPost.id}`, updatedPost);
        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erreur lors de la mise à jour du post");
    }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id: string, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`${apiBaseUrl}/blog-posts/${id}`);
        return id;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erreur lors de la suppression du post");
    }
});

const PostSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchPosts.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
            state.status = "success";
            state.postData = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload;
        });
        builder.addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
            state.status = "success";
            const postIndex = state.postData.findIndex((post) => post.title === action.payload.title);
            if (postIndex === -1) {
                state.postData.push(action.payload);
            }
        });
        builder.addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
            state.status = "success";
            state.postData.push(action.payload);
        });
        builder.addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
            state.status = "success";
            const index = state.postData.findIndex((post) => post.title === action.payload.title);
            if (index !== -1) {
                state.postData[index] = action.payload;
            }
        });
        builder.addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = "success";
            state.postData = state.postData.filter((post) => post.title !== action.payload);
        });
        builder.addCase(createPost.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },
});


export default PostSlice.reducer;
