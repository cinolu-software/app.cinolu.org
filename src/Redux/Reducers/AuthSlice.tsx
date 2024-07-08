import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios, {apiBaseUrl} from "@/services/axios";
import Cookies from "js-cookie";
import {AuthResponse, LoginSubmitProp, AuthState, UpdateProfilePayload, UpdateProfilePassword} from "@/Types/AuthType";
import {RootState} from "@/Redux/Store";

export const login = createAsyncThunk<AuthResponse, LoginSubmitProp, {
    rejectValue: string
}>("auth/login", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/auth/login`, data);
        Cookies.set("cinolu_token", JSON.stringify(response.data));
        return response.data;
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

export const checkAuth = createAsyncThunk<AuthResponse | null, void, {
    rejectValue: string
}>("auth/checkAuth", async (_, {rejectWithValue}) => {
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

export const updateProfile = createAsyncThunk<AuthResponse, UpdateProfilePayload, {
    rejectValue: string
}>("auth/updateProfile", async (profileData, {rejectWithValue}) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/auth/profile`, profileData);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message?.map((err: {
            message: string
        }) => `${err.message}`).join(", ") || "Une erreur est survenue lors de la mise à jour du profil";
        return rejectWithValue(errorMessage);
    }
});

export const updatePassword = createAsyncThunk<AuthResponse, UpdateProfilePassword, {
    rejectValue: string
}>("auth/updatePassword", async (passwordData, {rejectWithValue}) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/auth/update-password`, passwordData);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message?.map((err: {
            message: string
        }) => `${err.message}`).join(", ") || "Une erreur est survenue lors de la mise à jour du mot de passe";
        return rejectWithValue(errorMessage);
    }
});

const initialState: AuthState = {
    user: null,
    statusLogin: "idle",
    statusLogout: "idle",
    statusUpdateProfile: "idle",
    statusCheckAuth: "idle",
    statusUpdatePassword: "idle",
    errorLogin: null,
    errorLogout: null,
    errorCheckAuth: null,
    errorUpdateProfile: null,
    errorUpdatePassword: null,
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
                state.statusLogin = "loading";
                state.errorLogin = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.statusLogin = "succeeded";
                state.user = action.payload.data;
                state.isAuthenticated = true;
                Cookies.set("cinolu_token", JSON.stringify(action.payload.data));
            })
            .addCase(login.rejected, (state, action) => {
                state.statusLogin = "failed";
                state.errorLogin = action.payload || "";
            })

            .addCase(logout.pending, (state) => {
                state.statusLogout = "loading";
                state.errorLogout = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.statusLogout = "succeeded";
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.statusLogout = "failed";
                state.errorLogout = action.payload || "";
            })

            .addCase(checkAuth.pending, (state) => {
                state.statusCheckAuth = "loading";
                state.errorCheckAuth = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.statusCheckAuth = "succeeded";
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                } else {
                    state.user = null;
                    state.isAuthenticated = false;
                }
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.statusCheckAuth = "failed";
                state.errorCheckAuth = action.payload || "";
            })

            .addCase(updateProfile.pending, (state) => {
                state.statusUpdateProfile = "loading";
                state.errorUpdateProfile = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.statusUpdateProfile = "succeeded";
                state.user = action.payload.data;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.statusUpdateProfile = "failed";
                state.errorUpdateProfile = action.payload || "";
            })

            .addCase(updatePassword.pending, (state) => {
                state.statusUpdatePassword = "loading";
                state.errorUpdatePassword = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.statusUpdatePassword = "succeeded";
                state.user = action.payload.data;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.statusUpdatePassword = "failed";
                state.errorUpdatePassword = action.payload || "";
            });
    },
});

export const {setAuthenticated, setUser} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectErrorLogin = (state: RootState) => state.auth.errorLogin;
export const selectErrorLogout = (state: RootState) => state.auth.errorLogout;
export const selectErrorCheckAuth = (state: RootState) => state.auth.errorCheckAuth;
export const selectErrorUpdateProfile = (state: RootState) => state.auth.errorUpdateProfile;
export const selectErrorUpdatePassword = (state: RootState) => state.auth.errorUpdatePassword;
export const selectStatusLogin = (state: RootState) => state.auth.statusLogin;
export const selectStatusLogout = (state: RootState) => state.auth.statusLogout;
export const selectStatusCheckAuth = (state: RootState) => state.auth.statusCheckAuth;
export const selectStatusUpdateProfile = (state: RootState) => state.auth.statusUpdateProfile;
export const selectStatusUpdatePassword = (state: RootState) => state.auth.statusUpdatePassword;

export default authSlice.reducer;

