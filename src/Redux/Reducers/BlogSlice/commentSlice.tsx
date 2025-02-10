import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, { apiBaseUrl } from "@/services/axios";
import {CreateComment, InitialStateComment, UpdateComment } from "@/Types/Blog/commentType";
import { RootState } from "@/Redux/Store";

const initialState: InitialStateComment = {
    comments: {
        byPostId: {},
        allIds: []
    },
    status: "idle",
    error: null,
};

export const createComment = createAsyncThunk(
    "comments/createComment",
    async (newComment: CreateComment, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/post-comments`, newComment);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de la création du commentaire");
        }
    }
);

export const updateComment = createAsyncThunk(
    "comments/updateComment",
    async (updatedComment: UpdateComment, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `${apiBaseUrl}/post-comments/${updatedComment.id}`,
                { content: updatedComment.content }
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de la mise à jour du commentaire");
        }
    }
);

export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async (id: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/post-comments/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de la suppression du commentaire");
        }
    }
);

const CommentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        const handlePending = (state: InitialStateComment) => {
            state.status = "loading";
        };

        const handleRejected = (state: InitialStateComment, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload;
        };

        builder
            .addCase(createComment.pending, handlePending)
            .addCase(createComment.fulfilled, (state, action: PayloadAction<Comment>) => {
                state.status = "success";
                // @ts-ignore
                const postId = action.payload.post.id;
                if (!state.comments.byPostId[postId]) {
                    state.comments.byPostId[postId] = [];
                }
                state.comments.byPostId[postId].unshift(action.payload);
                // @ts-ignore
                state.comments.allIds.push(action.payload.id);
            })
            .addCase(createComment.rejected, handleRejected)
            .addCase(updateComment.pending, handlePending)
            .addCase(updateComment.fulfilled, (state, action: PayloadAction<Comment>) => {
                state.status = "success";
                // @ts-ignore
                const postId = action.payload.post.id;
                // @ts-ignore
                const index = state.comments.byPostId[postId]?.findIndex((c: { id: any; }) => c.id === action.payload.id);
                if (index !== -1 && index !== undefined) {
                    state.comments.byPostId[postId][index] = action.payload;
                }
            })
            .addCase(updateComment.rejected, handleRejected)
            .addCase(deleteComment.pending, handlePending)
            .addCase(deleteComment.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "success";
                state.comments.allIds = state.comments.allIds.filter((id: string) => id !== action.payload);
                Object.keys(state.comments.byPostId).forEach(postId => {
                    state.comments.byPostId[postId] = state.comments.byPostId[postId]
                        .filter((comment: { id: string; }) => comment.id !== action.payload);
                });
            })
            .addCase(deleteComment.rejected, handleRejected);
    },
});


export default CommentSlice.reducer;