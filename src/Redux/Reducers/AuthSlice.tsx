import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { apiBaseUrl } from "@/services/axios";
import Cookies from "js-cookie";
import { AuthResponse, LoginSubmitProp, AuthState, UpdateProfilePayload } from "@/Types/AuthType";
import { RootState } from "@/Redux/Store";

export const login = createAsyncThunk<AuthResponse, LoginSubmitProp, { rejectValue: { message: string } }>(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/auth/login`, data);
            Cookies.set("cinolu_token", JSON.stringify(response.data));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logout = createAsyncThunk<void, void, { rejectValue: { message: string } }>(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await axios.post(`${apiBaseUrl}/auth/logout`, {});
            Cookies.remove("cinolu_token");
            return {};
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const checkAuth = createAsyncThunk<AuthResponse | null, void, { rejectValue: { message: string } }>(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        const token = Cookies.get("cinolu_token");
        if (token) {
            const user = JSON.parse(token);
            return user;
        } else {
            return null;
        }
    }
);

export const updateProfile = createAsyncThunk<AuthResponse, UpdateProfilePayload, { rejectValue: { message: string } }>(
    "auth/updateProfile",
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `${apiBaseUrl}/auth/profile`,
                profileData
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatePassword = createAsyncThunk(
    "auth/updatePassword",
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `${apiBaseUrl}/auth/update-password`,
                passwordData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProfileImage = createAsyncThunk(
    "profile/updateProfileImage",
    async ({ userId, image }) => {
        const formData = new FormData();
        formData.append("image", image);

        const response = await axios.post(`/users/image/${userId}`, formData, {
            withCredentials: true,
        });

        return response.data;
    }
);

const initialState: AuthState = {
    user: null,
    statusLogin: "idle",
    statusLogout: "idle",
    statusUpdateProfile: 'idle',
    statusCheckAuth: "idle",
    error: null,
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
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.statusLogin = "succeeded";
                state.user = action.payload.data;
                state.isAuthenticated = true;
                Cookies.set("cinolu_token", JSON.stringify(action.payload.data));
            })
            .addCase(login.rejected, (state, action) => {
                state.statusLogin = "failed";
                state.error = action.payload?.message || "Login failed";
            })
            .addCase(logout.fulfilled, (state) => {
                state.statusLogout = 'idle';
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(checkAuth.pending, (state) => {
                state.statusCheckAuth = "loading";
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
                state.error = action.payload?.message || "Check auth failed";
            })
            .addCase(updateProfile.pending, (state) => {
                state.statusUpdateProfile = "loading";
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.statusUpdateProfile = "succeeded";
                state.user = action.payload.data;
                localStorage.setItem(
                    "ACCESS_ACCOUNT",
                    JSON.stringify(action.payload.data)
                );
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.statusUpdateProfile = "failed";
                state.error = action.payload?.message || "Update failed";
            })
        ;
    },
});

export const { setAuthenticated, setUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectError = (state: RootState) => state.auth.error;
export const selectStatus = (state: RootState) => state.auth.statusLogin;
export const selectStatusUpdateProfil = (state: RootState) => state.auth.statusUpdateProfile;

export default authSlice.reducer;
