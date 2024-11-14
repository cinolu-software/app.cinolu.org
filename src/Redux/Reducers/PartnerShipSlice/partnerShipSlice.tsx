import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, { apiBaseUrl } from "@/services/axios";
import { PartnerShipType, InitialStatePartnerShipType, createPartnerShipType } from "@/Types/PartnerShipTypes/PartnerShipType";

const initialState: InitialStatePartnerShipType = {
    partnerShipData: [],
    status: 'idle',
    filterToggle: false,
    loading: false,
    error: null,
    isOpenModalCreatePartnerShip: false,
    isOpenModalEditPartnerShip: false,
    isOpenModalDeletePartnerShip: false,
    selectedPartnerShip: null,
    navId: 0,
    tabId: 0,
    formValues: []
};

export const fetchPartnerShip = createAsyncThunk<{data: PartnerShipType[]}>(
    'partnerShip/fetchPartnerShip',
    async () => {
        const response = await axiosInstance.get<{data: PartnerShipType[]}>(`${apiBaseUrl}/partnerships`);
        const partnerShipData = response.data.data;
        return {data: partnerShipData};
    }
);

export const createPartnerShip = createAsyncThunk(
    'partnerShip/createPartnerShip',
    async (newPartnerShip : createPartnerShipType, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post<{ data : createPartnerShipType }>(`${apiBaseUrl}/partnerships`, newPartnerShip);
            return {data: response.data.data};
        }
        catch (error: any) {
            return rejectWithValue(error.response?.data || "Une erreur est survenue lors de la création du partenariat.");
        }
    }
);

export const deletePartnerShip = createAsyncThunk(
    'partnerShip/deletePartnerShip',
    async (id: string, {rejectWithValue}) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/partnerships/${id}`);
            return id;
        }
        catch (error: any) {
            return rejectWithValue(error.response?.data || "Une erreur est survenue lors de la suppression du partenariat.");
        }
    }
);

export const updatePartnerShip = createAsyncThunk(
    'partnerShip/updatePartnerShip',
    async (partnerShip: PartnerShipType, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.put<{data: PartnerShipType}>(`${apiBaseUrl}/partnerships/${partnerShip.id}`, partnerShip);
            return {data: response.data.data};
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Une erreur est survenue lors de la modification du partenariat.");
        }
    }
);

const PartnerShipSlice = createSlice({
    name: 'partnerShip',
    initialState,
    reducers: {
        setModalCreatePartnerShip: (state, action: PayloadAction<{isOpen: boolean}>)=> {
            state.isOpenModalCreatePartnerShip = action.payload.isOpen;
        },
        setModalEditPartnerShip: (state, action: PayloadAction<{isOpen: boolean, partnerShip?: PartnerShipType |null}>)=> {
            state.isOpenModalEditPartnerShip = action.payload.isOpen;
            if(action.payload.partnerShip){
                state.selectedPartnerShip = action.payload.partnerShip
            }
        },
        setModalDeletePartnerShip: (state, action: PayloadAction<{isOpen: boolean; partnerShip?: PartnerShipType | null}>)=> {
            state.isOpenModalDeletePartnerShip = action.payload.isOpen;
            if(action.payload.partnerShip){
                state.selectedPartnerShip = action.payload.partnerShip
            }
        },
        setNavId: (state, action: PayloadAction<number>) => {
            state.navId = action.payload;
        },
        setTabId: (state, action: PayloadAction<number>) => {
            state.tabId = action.payload;
        },
        setFormValue: (state, action: { payload: {name: keyof any, value: any}}) => {
            state.formValues[action.payload.name] = action.payload.value;
        },
        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartnerShip.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPartnerShip.fulfilled, (state, action: PayloadAction<{ data: PartnerShipType[] }>) => {
                state.status = 'succeeded';
                state.partnerShipData = action.payload.data;
            })
            .addCase(fetchPartnerShip.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Erreur lors de la récupération des partenariats.";
            });
        builder
            .addCase(createPartnerShip.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createPartnerShip.fulfilled, (state, action: PayloadAction<{ data: any }>) => {
                state.status = 'succeeded';
                state.partnerShipData.push(action.payload.data);
            })
            .addCase(createPartnerShip.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Erreur lors de la création du partenariat.";
            });
        builder
            .addCase(deletePartnerShip.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deletePartnerShip.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.partnerShipData = state.partnerShipData.filter(partnerShip => partnerShip.id !== action.payload);
            })
            .addCase(deletePartnerShip.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Erreur lors de la suppression du partenariat.";
            });
        builder
            .addCase(updatePartnerShip.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updatePartnerShip.fulfilled, (state, action: PayloadAction<{ data: PartnerShipType }>) => {
                state.status = 'succeeded';
                const updatedPartnerShipIndex = state.partnerShipData.findIndex(partnerShip => partnerShip.id === action.payload.data.id);
                if (updatedPartnerShipIndex >= 0) {
                    state.partnerShipData[updatedPartnerShipIndex] = action.payload.data;
                }
            })
            .addCase(updatePartnerShip.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Erreur lors de la mise à jour du partenariat.";
            });
    }
});

export const {
    setModalCreatePartnerShip,
    setModalEditPartnerShip,
    setModalDeletePartnerShip,
    setNavId,
} = PartnerShipSlice.actions;

export default PartnerShipSlice.reducer;
