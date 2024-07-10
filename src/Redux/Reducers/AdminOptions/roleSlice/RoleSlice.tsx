import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios, {apiBaseUrl} from "@/services/axios";
import {InitialStateRoleType, TransformedRoleType, RoleType} from "@/Types/AdminOptions/Roles/RoleType";
import {RootState} from "@/Redux/Store";

const initialState: InitialStateRoleType = {
    originalRoleData: [],
    transformedRoleData: [],
    status: 'idle',
    error: null
}

const transformRole = (role: RoleType[]): TransformedRoleType[] => {
    return role.map(r=>({
        id: r.id,
        name: r.name,
        image: "product_list/product-categories/phone.png",
        created_at: r.created_at,
        updated_at: r.updated_at,
    }));
};

export const fetchRole = createAsyncThunk<{original: RoleType[], transformed: TransformedRoleType[]}>(
    'roles/fetchRole', async () => {
        const response = await axios.get<{data: RoleType[]}>(`${apiBaseUrl}/roles`);
        const originalRoles = response.data.data;
        const transformedRoles = transformRole(originalRoles);
        return { original: originalRoles, transformed: transformedRoles };
    }
);

export const createRole = createAsyncThunk<RoleType, {name: string}>(
    'roles/createRole', async (newRole, {rejectWithValue}) => {
        try{
            const response = await axios.post<{ data: RoleType }>(`${apiBaseUrl}/roles`, newRole);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


const RoleSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchRole.pending, (state)=>{
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchRole.fulfilled, (state, action: PayloadAction<{original: RoleType[], transformed: TransformedRoleType[]}>)=>{
                state.status = 'succeeded';
                state.originalRoleData = action.payload.original;
                state.transformedRoleData = action.payload.transformed;
            })
            .addCase(fetchRole.rejected, (state, action)=>{
                state.status = 'failed';
                state.error = action.error.message || 'Une erreur est survenue';
            })
    }
});

export const selectRoleStatus = (state: RootState) => state.role.status;
export const selectOriginalRoles = (state: RootState) => state.role.originalRoleData;
export const selectTransformedRoles = (state: RootState) => state.role.transformedRoleData;

export default RoleSlice.reducer;