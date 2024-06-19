import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { apiBaseUrl } from "@/services/axios";
import Cookies from "js-cookie";
import { AuthResponse, LoginSubmitProp, PasswordData, ProfileData, ProfileImageData, AuthState } from "@/Types/AuthType";
import { RootState, AppDispatch } from "@/Redux/Store";

export const login = createAsyncThunk<AuthResponse, LoginSubmitProp, { rejectValue: { message: string }, dispatch: AppDispatch }>(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/auth/login`, data);
            Cookies.set("user", JSON.stringify(response.data.user));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

// export const logout = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
//     "auth/logout",
//     async (_, thunkAPI) => {
//         try {
//             await axios.post(`${apiBaseUrl}/auth/logout`, {});
//             Cookies.remove("user");
//             return {};
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         }
//     }
// );

export const checkAuth = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
    "auth/checkAuth",
    async (_, { dispatch }) => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            const user = JSON.parse(userCookie);
            dispatch(setAuthenticated(true));
            dispatch(setUser(user));
        }
    }
);

export const updateProfile = createAsyncThunk<AuthResponse, ProfileData, { rejectValue: { message: string }, dispatch: AppDispatch }>(
    "auth/updateProfile",
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${apiBaseUrl}/auth/profile`, profileData);
            Cookies.set("user", JSON.stringify(response.data));
            return response.data;
        } catch (error: any) {
            return rejectWithValue({ message: error.response.data.message });
        }
    }
);

export const updatePassword = createAsyncThunk<AuthResponse, PasswordData, { rejectValue: { message: string }, dispatch: AppDispatch }>(
    "auth/updatePassword",
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${apiBaseUrl}/auth/update-password`, passwordData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({ message: error.response.data.message });
        }
    }
);

export const updateProfileImage = createAsyncThunk<AuthResponse, ProfileImageData, { rejectValue: { message: string }, dispatch: AppDispatch }>(
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
    status: "idle",
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
            .addCase(checkAuth.fulfilled, (state) => {
                state.status = "succeeded";
                state.isAuthenticated = true;
            })
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.isAuthenticated = true;
                Cookies.set("user", JSON.stringify(action.payload.user));
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || "Login failed";
            })
            // .addCase(updateProfile.pending, (state) => {
            //     state.status = "loading";
            //     state.error = null;
            // })
            // .addCase(updateProfile.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     state.user = action.payload;
            //     Cookies.set("user", JSON.stringify(action.payload));
            // })
            // .addCase(updateProfile.rejected, (state, action) => {
            //     state.status = "failed";
            //     state.error = action.payload?.message || "Profile update failed";
            // })
            // .addCase(updateProfileImage.pending, (state) => {
            //     state.status = "loading";
            //     state.error = null;
            // })
            // .addCase(updateProfileImage.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     if (state.user) {
            //         state.user.profile = action.payload.data.data.profile;
            //         Cookies.set("user", JSON.stringify(state.user));
            //     }
            // })
            // .addCase(updateProfileImage.rejected, (state, action) => {
            //     state.status = "failed";
            //     state.error = action.payload?.message || "Profile image update failed";
            // })
            // .addCase(logout.fulfilled, (state) => {
            //     state.status = "idle";
            //     state.user = null;
            //     state.isAuthenticated = false;
            // });
    },
});

export const { setAuthenticated, setUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectError = (state: RootState) => state.auth.error;
export const selectStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
