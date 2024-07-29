import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { apiBaseUrl } from "@/services/axios";
import { InitialStateRoleType, TransformedRoleType, RoleType, CreateRole } from "@/Types/AdminOptions/Roles/RoleType";
import { RootState } from "@/Redux/Store";

const initialState: InitialStateRoleType = {
    originalRoleData: [],
    transformedRoleData: [],
    status: 'idle',
    error: null,
    isOpenModalCreateRole: false,
    isOpenModalEditRole: false,
    isOpenModalDeleteRole: false,
    selectedRole: null,
};

const transformRole = (roles: RoleType[]): TransformedRoleType[] => {
    return roles.map(r => ({
        id: r.id,
        name: r.name,
        image: "admin/roles/user_role.png",
        created_at: r.created_at,
        updated_at: r.updated_at,
    }));
};

export const fetchRole = createAsyncThunk<{ original: RoleType[], transformed: TransformedRoleType[] }>(

    'roles/fetchRole', async () => {
        const response = await axios.get<{ data: RoleType[] }>(`${apiBaseUrl}/roles`);
        const originalRoles = response.data.data;
        const transformedRoles = transformRole(originalRoles);
        return { original: originalRoles, transformed: transformedRoles };
    }

);


export const createRole = createAsyncThunk<RoleType, CreateRole>(
    'roles/createRole', async (newRole, { rejectWithValue }) => {
        try {
            const response = await axios.post<{ data: RoleType }>(`${apiBaseUrl}/roles`, newRole);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateRole = createAsyncThunk<RoleType, { id: number, name: string }>(
    'roles/updateRole', async (updatedRole, { rejectWithValue }) => {
        try {
            const response = await axios.patch<{ data: RoleType }>(`${apiBaseUrl}/roles/${updatedRole.id}`, { name: updatedRole.name });
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteRole = createAsyncThunk<number, number>(
    'roles/deleteRole', async (roleId, { rejectWithValue }) => {
        try {
            await axios.delete(`${apiBaseUrl}/roles/${roleId}`);
            return roleId;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const RoleSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        setModalCreateRole: (state, action: PayloadAction<boolean>) => {
            state.isOpenModalCreateRole = action.payload;
        },
        setModalEditRole: (state, action: PayloadAction<{ isOpen: boolean, role: RoleType | null }>) => {
            state.isOpenModalEditRole = action.payload.isOpen;
            state.selectedRole = action.payload.role;
        },
        setModalDeleteRole: (state, action: PayloadAction<{ isOpen: boolean, role: RoleType | null }>) => {
            state.isOpenModalDeleteRole = action.payload.isOpen;
            state.selectedRole = action.payload.role;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRole.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchRole.fulfilled, (state, action: PayloadAction<{ original: RoleType[], transformed: TransformedRoleType[] }>) => {
                state.status = 'succeeded';
                state.originalRoleData = action.payload.original;
                state.transformedRoleData = action.payload.transformed;
            })
            .addCase(fetchRole.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Une erreur est survenue';
            })
            .addCase(createRole.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createRole.fulfilled, (state, action: PayloadAction<RoleType>) => {
                state.status = 'succeeded';
                state.originalRoleData.push(action.payload);
                state.transformedRoleData.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    image: "admin/roles/user_role.png",
                    created_at: action.payload.created_at,
                    updated_at: action.payload.updated_at,
                });
            })
            .addCase(createRole.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || 'Une erreur est survenue';
            })
            .addCase(updateRole.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateRole.fulfilled, (state, action: PayloadAction<RoleType>) => {
                state.status = 'succeeded';
                const index = state.originalRoleData.findIndex(role => role.id === action.payload.id);
                if (index !== -1) {
                    state.originalRoleData[index] = action.payload;
                    state.transformedRoleData[index] = {
                        id: action.payload.id,
                        name: action.payload.name,
                        image: "admin/roles/user_role.png",
                        created_at: action.payload.created_at,
                        updated_at: action.payload.updated_at,
                    };
                }
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || 'Une erreur est survenue';
            })
            .addCase(deleteRole.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteRole.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = 'succeeded';
                state.originalRoleData = state.originalRoleData.filter(role => role.id !== action.payload);
                state.transformedRoleData = state.transformedRoleData.filter(role => role.id !== action.payload);
            })
            .addCase(deleteRole.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || 'Une erreur est survenue';
            });
    },
});

export const selectRoleStatus = (state: RootState) => state.role.status;
export const selectOriginalRoles = (state: RootState) => state.role.originalRoleData;
export const selectTransformedRoles = (state: RootState) => state.role.transformedRoleData;
export const selectErreur = (state: RootState) => state.role.error;
export const { setModalCreateRole, setModalEditRole, setModalDeleteRole } = RoleSlice.actions;

export default RoleSlice.reducer;