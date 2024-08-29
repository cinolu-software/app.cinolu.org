
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { apiBaseUrl } from "@/services/axios";
import Cookies from "js-cookie";
import { AuthResponse, LoginSubmitProp, AuthState, UpdateProfilePayload, UpdateProfilePassword } from "@/Types/AuthType";
import { RootState } from "@/Redux/Store";

export const login = createAsyncThunk<AuthResponse, LoginSubmitProp, { rejectValue: string }>("auth/login", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/auth/login`, data);
        if(response.data?.data?.roles.some((role: { name: string; }) => role.name === "admin")){
            Cookies.set("cinolu_token", JSON.stringify(response.data));
            return response.data;
        }
        return rejectWithValue("Vous n'êtes pas autorisé à accéder à cette interface");
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de la connexion";
        return rejectWithValue(errorMessage);
    }
});


export const logout = createAsyncThunk<void, void, { rejectValue: string }>("auth/logout", async (_, thunkAPI) => {
    try {
        await axios.post(`${apiBaseUrl}/auth/logout`, {});
        Cookies.remove("cinolu_token");
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de la déconnexion";
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const checkAuth = createAsyncThunk<AuthResponse | null, void, { rejectValue: string }>("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const token = Cookies.get("cinolu_token");
        if (token) {
            const user = JSON.parse(token);
            return user;
        } else {
            return null;
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de la vérification de l'authentification";
        return rejectWithValue(errorMessage);
    }
});

export const updateProfile = createAsyncThunk<AuthResponse, UpdateProfilePayload, { rejectValue: string }>("auth/updateProfile", async (profileData, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/auth/profile`, profileData);
        Cookies.set("cinolu_token", JSON.stringify(response.data));
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message?.map((err: { message: string }) => `${err.message}`).join(", ") || "Une erreur est survenue lors de la mise à jour du profil";
        return rejectWithValue(errorMessage);
    }
});

export const updatePassword = createAsyncThunk<AuthResponse, UpdateProfilePassword, { rejectValue: string }>("auth/updatePassword", async (passwordData, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/auth/update-password`, passwordData);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message?.map((err: { message: string }) => `${err.message}`).join(", ") || "Une erreur est survenue lors de la mise à jour du mot de passe";
        return rejectWithValue(errorMessage);
    }
});

export const updateProfileImage = createAsyncThunk<AuthResponse, FormData, { rejectValue: string }>("auth/updateProfileImage", async (formData, { rejectWithValue, getState }) => {
    try {
        const state = getState() as RootState;
        const userId = state.auth.user?.id;

        if (!userId) {
            throw new Error("User not authenticated");
        }

        const response = await axios.post(`${apiBaseUrl}/users/image/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        Cookies.set("cinolu_token", JSON.stringify(response.data));
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de la mise à jour de l'image de profil";
        return rejectWithValue(errorMessage);
    }
});

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
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
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
                state.user = action.payload.data;
                state.isAuthenticated = true;
                Cookies.set("cinolu_token", JSON.stringify(action.payload));
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

            .addCase(checkAuth.pending, (state) => {
                state.statusAuth = "loading";
                state.errorAuth = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.statusAuth = "succeeded";
                if (action.payload) {
                    state.user = action.payload.data;
                    state.isAuthenticated = true;
                } else {
                    state.user = null;
                    state.isAuthenticated = false;
                }
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.statusAuth = "failed";
                state.errorAuth = action.payload || "";
            })

            .addCase(updateProfile.pending, (state) => {
                state.statusAuth = "loading";
                state.errorAuth = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.statusAuth = "succeeded";
                state.user = action.payload.data;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.statusAuth = "failed";
                state.errorAuth = action.payload || "";
            })

            .addCase(updatePassword.pending, (state) => {
                state.statusAuth = "loading";
                state.errorAuth = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.statusAuth = "succeeded";
                state.user = action.payload.data;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.statusAuth = "failed";
                state.errorAuth = action.payload || "";
            })

            .addCase(updateProfileImage.pending, (state) => {
                state.statusAuth = "loading";
                state.errorAuth = null;
            })
            .addCase(updateProfileImage.fulfilled, (state, action) => {
                state.statusAuth = "succeeded";
                if (state.user) {
                    state.user.profile = action.payload.data.profile;
                }
            })
            .addCase(updateProfileImage.rejected, (state, action) => {
                state.statusAuth = "failed";
                state.errorAuth = action.payload || "";
            });
    },
});

export const selectAuth = (state: RootState) => state.auth;
export const selectStatus = (state: RootState) => state.auth.statusAuth;
export const selectError = (state: RootState) => state.auth.errorAuth;

export default authSlice.reducer;
