import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios, {apiBaseUrl} from "@/services/axios";
import {UserType, InitialStateUserType} from "@/Types/Users/UsersType";
import {RootState} from "@/Redux/Store";


const initialState: InitialStateUserType = {
    usersData : [],
    status: 'idle',
    error: null
}

export const fetchUsers = createAsyncThunk<{data: UserType [] }>('users/fetchUsers', async () => {
        const response = await axios.get<{data: UserType[]}>(`${apiBaseUrl}/users`);
        const users = response.data.data;

        return { data : users}
    }
);

const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<{data: UserType[]}>)=>{
                state.status = 'succeeded';
                state.usersData = action.payload.data;
            })
            .addCase(fetchUsers.rejected, (state, action)=>{
                state.status = 'failed';
                state.error = action.error.message || 'Une erreur est survenue'
            })
    }
});

export default UsersSlice.reducer