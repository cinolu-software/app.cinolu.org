import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, { apiBaseUrl } from "@/services/axios";
import { InitialStatePost, Post, UpdatePost, CreatePost, GetPostType } from "@/Types/Blog/postType";


const initialState: InitialStatePost = {
    postData: [],
    status: "idle",
    error: null,
    isOpenModalEditPost: false,
    isOpenModalDeletePost: false,
    selectedPost: null,
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
        return response.data.data as GetPostType;
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
        const response = await axiosInstance.patch(`${apiBaseUrl}/blog-posts/${updatedPost.id}`, updatedPost);
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

export const uploadPostImage = createAsyncThunk(
    "posts/uploadImage",
    async ({ id, file }: { id: string; file: File }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("thumb", file);
            const response = await axiosInstance.post(
                `${apiBaseUrl}/blog-posts/image-cover`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de l'upload de l'image");
        }
    }
);

const PostSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setModalEditPost: (state, action: PayloadAction<{isOpen : boolean, post: GetPostType|null}>) => {
            state.isOpenModalEditPost = action.payload.isOpen;
        },
        setModalDeletePost: (state, action: PayloadAction<{isOpen : boolean, post: GetPostType|null}>) => {
            state.isOpenModalDeletePost = action.payload.isOpen;
        }
    },
    extraReducers: (builder) => {
        const handlePending = (state: InitialStatePost) => {
            state.status = "loading";
        };

        const handleRejected = (state: InitialStatePost, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload;
        };

        builder
            .addCase(fetchPosts.pending, handlePending)
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.status = "success";
                state.postData = action.payload;
            })
            .addCase(fetchPosts.rejected, handleRejected)
            .addCase(fetchPostById.pending, handlePending)
            .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<GetPostType>) => {
                state.status = "success";
                state.selectedPost = action.payload;
            })
            .addCase(fetchPostById.rejected, handleRejected)
            .addCase(createPost.pending, handlePending)
            .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.status = "success";
                state.postData.unshift(action.payload);
            })
            .addCase(createPost.rejected, handleRejected)
            .addCase(updatePost.pending, handlePending)
            .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.status = "success";
                const index = state.postData.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.postData[index] = action.payload;
                }
            })
            .addCase(updatePost.rejected, handleRejected)
            .addCase(deletePost.pending, handlePending)
            .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "success";
                state.postData = state.postData.filter(post => post.id !== action.payload);
            })
            .addCase(deletePost.rejected, handleRejected)
            .addCase(uploadPostImage.pending, handlePending)
            .addCase(uploadPostImage.fulfilled, (state, action: PayloadAction<Post>) => {
                state.status = "success";
                const index = state.postData.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.postData[index] = action.payload;
                }
            })
            .addCase(uploadPostImage.rejected, handleRejected);
    },
});

export const {setModalEditPost, setModalDeletePost} = PostSlice.actions;

export default PostSlice.reducer;