import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { apiBaseUrl } from "@/services/axios";
import Cookies from "js-cookie";
import { AuthResponse, LoginSubmitProp, AuthState, UpdateProfilePayload, UpdateProfilePassword } from "@/Types/AuthType";
import { RootState } from "@/Redux/Store";
import axiosInstance from "@/services/axios";


export const login = createAsyncThunk<AuthResponse, LoginSubmitProp, { rejectValue: string }>(
    "auth/sign-in",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/auth/sign-in`, data);
            const user = JSON.stringify(response?.data?.data);

            Cookies.set("cinolu_token", user);
            localStorage.setItem('user_profile', user);
            return { user: response.data.data };

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de la connexion";
            return rejectWithValue(errorMessage);
        }
    }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            Cookies.remove("cinolu_token");
            window.location.href = "/auth/login";
        } catch (error: any) {
            const errorMessage = "Une erreur est survenue lors de la déconnexion";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const updateProfile = createAsyncThunk<AuthResponse, UpdateProfilePayload, { rejectValue: string }>(
    "auth/updateProfile",
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${apiBaseUrl}/auth/profile`, profileData);
            const updatedProfile = response.data.data;
            localStorage.setItem("user_profile", JSON.stringify(updatedProfile));
            return { user: updatedProfile };
        }
        catch (error: any) {
            const errorMessage = error.response?.data?.message?.map((err: { message: string }) => `${err.message}`).join(", ") || "Une erreur est survenue lors de la mise à jour du profil";
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

            localStorage.setItem("user_profile", JSON.stringify(response.data.data));

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

const initialState: AuthState = {
    user: null,
    statusAuth: "idle",
    errorAuth: null,
    isAuthenticated: false,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadUserFromStorage: (state) => {
            const storedUser = localStorage.getItem('user_profile');
            if (storedUser) {
                state.user = JSON.parse(storedUser);
                state.isAuthenticated = true;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.statusAuth = "loading";
                state.errorAuth = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.statusAuth = "succeeded";
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.statusAuth = "failed";
                state.errorAuth = action.payload || "";
            })
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
                localStorage.setItem('user_profile', JSON.stringify(action.payload.user));
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
                localStorage.setItem('user_profile', JSON.stringify(action.payload.user));
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
            });
    },
});

export const { loadUserFromStorage } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export const selectStatus = (state: RootState) => state.auth.statusAuth;
export const selectError = (state: RootState) => state.auth.errorAuth;

export default authSlice.reducer;
