import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, { apiBaseUrl } from "@/services/axios";
import { UserType, InitialStateUserType, StaffMemberType, CoachsType } from "@/Types/Users/UsersType";

const initialState: InitialStateUserType = {
    usersData: [],
    coachsData: [],
    staffMemberData: [],

    statusUsers: 'idle',
    statusCoachs: 'idle',
    statusStaff: 'idle',

    filterToggle: false,
    errorUsers: null,
    errorCoachs: null,
    errorStaff: null,

    isOpenModalDeleteUser: false,
    isOpenModalDeleteCoach: false,
    isOpenModalDeleteStaffMember: false,

    isOpenModalUpdateCoach: false,
    isOpenModalUpdateUser: false,
    isOpenModalUpdateStaphMember: false,

    selectedUser: null,
    selectedCoach: null,
    selectedStaffMember: null,

    navId: 1,
    tabId: 1,
    formValue: {
        email: "",
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
        return { data: response.data.data };
    }
);

export const fetchStaffMembers = createAsyncThunk<{ data: StaffMemberType[] }>(
    'users/fetchStaffMembers',
    async () => {
        const response = await axiosInstance.get<{ data: StaffMemberType[] }>(`${apiBaseUrl}/users/roles/staff`);
        return { data: response.data.data };
    }
);

export const fetchCoaches = createAsyncThunk<{ data: UserType[] }>(
    'users/fetchCoaches',
    async () => {
        const response = await axiosInstance.get<{ data: UserType[] }>(`${apiBaseUrl}/users/roles/coachs`);
        return { data: response.data.data };
    }
);


export const createUser = createAsyncThunk<{ data: UserType }, Partial<UserType>>(
    'users/createUser',
    async (newUser, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<{ data: UserType }>(`${apiBaseUrl}/users`, {
                email: newUser.email,
                name: newUser.name,
                phone_number: newUser.phone_number,
                address: newUser.address,
                roles: newUser.roles
            });
            return { data: response.data.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Une erreur est survenue lors de la création de l’utilisateur.');
        }
    }
);

export const updateUser = createAsyncThunk<{ data: UserType }, Partial<UserType>>(
    'users/updateUser',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch<{ data: UserType }>(`${apiBaseUrl}/users/${user.id}`, user);
            return { data: response.data.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Une erreur est survenue lors de la mise à jour de l’utilisateur.');
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
        setModalDeleteCoach: (state, action: PayloadAction<{ isOpen: boolean; user?: CoachsType | null }>) => {
            state.isOpenModalDeleteCoach = action.payload.isOpen;
            if (action.payload.user) {
                state.selectedCoach = action.payload.user;
            }
        },
        setModalDeleteStaffMember: (state, action: PayloadAction<{ isOpen: boolean; user?: StaffMemberType | null }>) => {
            state.isOpenModalDeleteStaffMember = action.payload.isOpen;
            if (action.payload.user) {
                state.selectedStaffMember = action.payload.user;
            }
        },

        setModalUpdateCoach: (state, action: PayloadAction<{isOpen: boolean; user?: CoachsType | null}>) => {
            state.isOpenModalUpdateCoach = action.payload.isOpen;
            if(action.payload.user) {
                state.selectedCoach = action.payload.user;
            }
        },
        setModalUpdateUser: (state, action: PayloadAction<{isOpen: boolean; user?: UserType | null}>) => {
            state.isOpenModalUpdateUser = action.payload.isOpen;
            if(action.payload.user) {
                state.selectedUser = action.payload.user;
            }
        },

        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        },
        setSelectedUser: (state, action: PayloadAction<{user: UserType | null}>) => {
            state.selectedUser = action.payload.user;
        },
        setSelectedCoach: (state, action: PayloadAction<{coach: CoachsType}>) => {
            state.selectedCoach = action.payload.coach;
        },
        setSelectedStaffMember : (state, action: PayloadAction<{staffMember: StaffMemberType}>) => {
            state.selectedStaffMember = action.payload.staffMember;
        },
        resetFormValue : (state) => {
            state.formValue = {
                email: "",
                name: "",
                phone_number: "",
                address: "",
                roles: [],
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.statusUsers = 'loading';
                state.errorUsers = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<{ data: UserType[] }>) => {
                state.statusUsers = 'succeeded';
                state.usersData = action.payload.data;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.statusUsers = 'failed';
                state.errorUsers = action.error.message || 'Erreur lors de la récupération des utilisateurs.';
            })
            .addCase(fetchStaffMembers.pending, (state) => {
                state.statusStaff = 'loading';
            })
            .addCase(fetchStaffMembers.fulfilled, (state, action: PayloadAction<{ data: StaffMemberType[] }>) => {
                state.statusStaff = 'succeeded';
                state.staffMemberData = action.payload.data;
            })
            .addCase(fetchStaffMembers.rejected, (state, action) => {
                state.statusStaff = 'failed';
                state.errorStaff = action.error.message || 'Erreur lors de la récupération des membres du staff.';
            })
            .addCase(fetchCoaches.pending, (state) => {
                state.statusCoachs = 'loading';
            })
            .addCase(fetchCoaches.fulfilled, (state, action: PayloadAction<{ data: UserType[] }>) => {
                state.statusCoachs = 'succeeded';
                state.coachsData = action.payload.data;
            })
            .addCase(fetchCoaches.rejected, (state, action) => {
                state.statusCoachs = 'failed';
                state.errorCoachs = action.error.message || 'Erreur lors de la récupération des coachs.';
            })
            .addCase(createUser.pending, (state) => {
                state.statusUsers = 'loading';
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<{ data: UserType }>) => {
                state.statusUsers = 'succeeded';
                state.usersData.push(action.payload.data);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.statusUsers = 'failed';
                state.errorUsers = action.error.message || 'Erreur lors de la création de l’utilisateur.';
            })
            .addCase(updateUser.pending, (state) => {
                state.statusUsers = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<{ data: UserType }>) => {
                state.statusUsers = 'succeeded';
                const updatedUser = action.payload.data;
                const index = state.usersData.findIndex((user) => user.id === updatedUser.id);
                if (index !== -1) {
                    state.usersData[index] = updatedUser;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.statusUsers = 'failed';
                state.errorUsers = action.error.message || 'Erreur lors de la mise à jour de l’utilisateur.';
            })
            .addCase(deleteUser.pending, (state) => {
                state.statusUsers = 'loading';
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.statusUsers = 'succeeded';
                state.usersData = state.usersData.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.statusUsers = 'failed';
                state.errorUsers = action.error.message || 'Erreur lors de la suppression de l’utilisateur.';
            });
    },
});

export const {
    setModalDeleteUser,
    setFilterToggle,
    setSelectedStaffMember,
    setNavId,
    setTabId,
    setFormValue,
    resetFormValue,
    setModalDeleteCoach,
    setModalDeleteStaffMember,
    setModalUpdateCoach,
    setModalUpdateUser,
    setSelectedCoach,
    setSelectedUser,
} = UsersSlice.actions;

export default UsersSlice.reducer;
