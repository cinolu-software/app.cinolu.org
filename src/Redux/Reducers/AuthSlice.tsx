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
            Cookies.set("cinolu_token", JSON.stringify(response.data));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);



const initialState: AuthState = {
    user: null,
    status: "idle",
    error: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled,
                (state, action) => {
                    state.status = "succeeded";
                    state.user = action.payload.data;
                    state.isAuthenticated = true;
                    Cookies.set("cinolu_token", JSON.stringify(action.payload.data));
                })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || "Login failed";
            })

    },
    initialState,
    name: "auth",
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setAuthenticated, setUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectError = (state: RootState) => state.auth.error;
export const selectStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
