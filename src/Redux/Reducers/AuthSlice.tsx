import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "@/services/axios";
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import Cookies from "js-cookie";
import {AuthResponse, AuthState, UpdateProfilePassword, UpdateProfilePayload} from "@/Types/AuthType";
import {RootState} from "@/Redux/Store";


export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await axiosInstance.post(`${apiBaseUrl}/auth/sign-out`);
            Cookies.remove("cinolu_token");
        } catch (error: any) {
            const errorMessage = "Une erreur est survenue lors de la déconnexion";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const updateProfile = createAsyncThunk<any, UpdateProfilePayload, { rejectValue: string }>(
    "auth/updateProfile",
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${apiBaseUrl}/auth/profile`, profileData);
            const updatedProfile = response.data.data;
            return { user: updatedProfile };
        }
        catch (error: any) {
            const errorMessage = "Une erreur est survenue lors de la mise à jour du profil";
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateProfileImage = createAsyncThunk<AuthResponse, FormData, { rejectValue: string }>(
    "auth/updateProfileImage",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/users/image-profile/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return { user: response.data.data };
        }
        catch (error: any) {
            const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de la mise à jour de l'image de profil";
            return rejectWithValue(errorMessage);
        }
    }
);

export const updatePassword = createAsyncThunk<AuthResponse, UpdateProfilePassword, { rejectValue: string }>(
    "auth/updatePassword",
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${apiBaseUrl}/auth/update-password`, passwordData);
            return { user: response.data.data };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message?.map((err: { message: string }) => `${err.message}`).join(", ") || "Une erreur est survenue lors de la mise à jour du mot de passe";
            return rejectWithValue(errorMessage);
        }
    }
);

export const getProfile = createAsyncThunk<AuthResponse, void, { rejectValue: string }>(
    "auth/getProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/auth/profile`);
            const user = response.data.data;
            Cookies.set("cinolu_token", JSON.stringify(user));
            return { user };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Erreur lors de la récupération du profil utilisateur";
            return rejectWithValue(errorMessage);
        }
    }
);


const initialState: AuthState = {
    user : null,
    statusAuth : "idle",
    errorAuth : null,
    isAuthenticated : false,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.pending, (state) => {
                state.statusAuth = "loading";
                state.errorAuth = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.statusAuth = "succeeded";
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.statusAuth = "failed";
                state.errorAuth = action.payload || "";
            })
            .addCase(updateProfile.pending, (state) => {
                state.statusAuth = 'loading';
                state.errorAuth = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.statusAuth = 'succeeded';
                state.user = action.payload.user;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.statusAuth = 'failed';
                state.errorAuth = action.payload || '';
            })
            .addCase(updateProfileImage.pending, (state) => {
                state.statusAuth = 'loading';
                state.errorAuth = null;
            })
            .addCase(updateProfileImage.fulfilled, (state, action) => {
                state.statusAuth = 'succeeded';
                state.user = action.payload.user;
            })
            .addCase(updateProfileImage.rejected, (state, action) => {
                state.statusAuth = 'failed';
                state.errorAuth = action.payload || '';
            })
            .addCase(updatePassword.pending, (state) => {
                state.statusAuth = 'loading';
                state.errorAuth = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.statusAuth = 'succeeded';
                state.user = action.payload.user;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.statusAuth = 'failed';
                state.errorAuth = action.payload || '';
            })
            .addCase(getProfile.pending, (state) => {
                state.statusAuth = "loading";
                state.errorAuth = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.statusAuth = "succeeded";
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.statusAuth = "failed";
                state.errorAuth = action.payload || "Impossible de récupérer le profil";
            });
    },
});


export const selectStatus = (state: RootState) => state.auth.statusAuth;
export const selectError = (state: RootState) => state.auth.errorAuth;

export default authSlice.reducer;
