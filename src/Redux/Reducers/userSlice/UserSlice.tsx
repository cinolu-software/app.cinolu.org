import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, { apiBaseUrl } from "@/services/axios";
import { UserType, InitialStateUserType, StaffMemberType } from "@/Types/Users/UsersType";


const initialState: InitialStateUserType = {
    usersData: [],
    coachsData: [],
    staffMemberData: [],
    status: 'idle',
    filterToggle: false,
    error: null,
    isOpenModalCreateUser: false,
    isOpenModalEditUser: false,
    isOpenModalDeleteUser: false,
    selectedUser: null,
    navId: 1,
    tabId: 1,
    formValue: {
        email: "",
        first_name: "",
        last_name: "",
        name: "",
        phone_number: "",
        address: "",
        roles: [],
    }
};


export const fetchUsers = createAsyncThunk<{ data: UserType[] }>(
    'users/fetchUsers',
    async () => {
        const response = await axiosInstance.get<{ data: UserType[] }>(`${apiBaseUrl}/users`);
        const users = response.data.data;
        return { data: users };
    }
);


export const fetchStaffMembers = createAsyncThunk<{ data: StaffMemberType[] }>(
    'users/fetchStaffMembers',
    async () => {
        const response = await axiosInstance.get<{ data: StaffMemberType[] }>(`${apiBaseUrl}/users/staff-members`);
        return { data: response.data.data };
    }
);


export const fetchCoaches = createAsyncThunk<{ data: UserType[] }>(
    'users/fetchCoaches',
    async () => {
        const response = await axiosInstance.get<{ data: UserType[] }>(`${apiBaseUrl}/users/coachs`);
        return { data: response.data.data };
    }
);


export const createUser = createAsyncThunk<{ data: UserType }, Partial<UserType>>(
    'users/createUser',
    async (newUser, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<{ data: UserType }>(`${apiBaseUrl}/auth/add-user`, newUser);
            return { data: response.data.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Une erreur est survenue lors de la création de l’utilisateur.');
        }
    }
);


export const deleteUser = createAsyncThunk<string, string>(
    'users/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/users/${userId}`);
            return userId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Erreur lors de la suppression de l’utilisateur.');
        }
    }
);

const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setModalCreateUser: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateUser = action.payload.isOpen;
        },
        setModalEditUser: (state, action: PayloadAction<{ isOpen: boolean; user?: UserType | null }>) => {
            state.isOpenModalEditUser = action.payload.isOpen;
            if (action.payload.user) {
                state.selectedUser = action.payload.user;
            }
        },
        setNavId: (state, action: PayloadAction<number>) => {
            state.navId = action.payload;
        },
        setTabId: (state, action: PayloadAction<number>) => {
            state.tabId = action.payload;
        },
        setFormValue: (state, action: { payload: { name: keyof any, value: any } }) => {
            state.formValue[action.payload.name] = action.payload.value;
        },
        setModalDeleteUser: (state, action: PayloadAction<{ isOpen: boolean; user?: UserType | null }>) => {
            state.isOpenModalDeleteUser = action.payload.isOpen;
            if (action.payload.user) {
                state.selectedUser = action.payload.user;
            }
        },
        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<{ data: UserType[] }>) => {
                state.status = 'succeeded';
                state.usersData = action.payload.data;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Une erreur est survenue lors de la récupération des utilisateurs.';
            })

            .addCase(fetchStaffMembers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStaffMembers.fulfilled, (state, action: PayloadAction<{ data: StaffMemberType[] }>) => {
                state.status = 'succeeded';
                state.staffMemberData = action.payload.data;
            })
            .addCase(fetchStaffMembers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Erreur lors de la récupération des membres du staff.';
            })

            .addCase(fetchCoaches.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCoaches.fulfilled, (state, action: PayloadAction<{ data: UserType[] }>) => {
                state.status = 'succeeded';
                state.coachsData = action.payload.data;
            })
            .addCase(fetchCoaches.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Erreur lors de la récupération des coachs.';
            })

            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<{ data: UserType }>) => {
                state.status = 'succeeded';
                state.usersData.push(action.payload.data);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Une erreur est survenue lors de la création de l’utilisateur.';
            })

            .addCase(deleteUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.usersData = state.usersData.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Une erreur est survenue lors de la suppression de l’utilisateur.';
            });
    },
});

export const {
    setModalCreateUser,
    setModalEditUser,
    setModalDeleteUser,
    setFilterToggle,
    setNavId,
    setTabId,
    setFormValue
} = UsersSlice.actions;

export default UsersSlice.reducer;
