import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, { apiBaseUrl } from "@/services/axios";
import { PartnerType, InitialStatePatnerType } from "@/Types/PartnerType/PartnerType";

const initialState: InitialStatePatnerType = {
    partnerData: [],
    status: "idle",
    error: null,
    filterToggle: false,
    isOpenModalDeletePartner: false,
    isOpenModalEditPartner: false,
    isOpenModalCreatePartner: false,
    selectedPartner: null,
    navId: 0,
    tabId: 0,
    formValue: []
};

// Fetch partners
export const fetchPartner = createAsyncThunk<{ data: PartnerType[] }>(
    "partner/fetchPartner",
    async () => {
        const response = await axiosInstance.get<{ data: PartnerType[] }>(`${apiBaseUrl}/partners`);
        const partnerData = response.data.data;
        return { data: partnerData };
    }
);

// Create partner
export const createPartner = createAsyncThunk(
    "partner/createPartner",
    async (newPartner: PartnerType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<{ data: PartnerType }>(`${apiBaseUrl}/partners`, newPartner);
            return { data: response.data.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Une erreur est survenue lors de la création du partenaire.");
        }
    }
);

// Delete partner
export const deletePartner = createAsyncThunk(
    "partner/deletePartner",
    async (id: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/partners/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Une erreur est survenue lors de la suppression du partenaire.");
        }
    }
);

// Update partner
export const updatePartner = createAsyncThunk(
    "partner/updatePartner",
    async (partner: PartnerType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put<{ data: PartnerType }>(`${apiBaseUrl}/partners/${partner.id}`, partner);
            return { data: response.data.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Une erreur est survenue lors de la modification du partenaire.");
        }
    }
);

const PartnerSlice = createSlice({
    name: "partner",
    initialState,
    reducers: {
        setModalCreatePartner: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreatePartner = action.payload.isOpen;
        },
        setModalEditPartner: (state, action: PayloadAction<{ isOpen: boolean; partner?: PartnerType | null }>) => {
            state.isOpenModalEditPartner = action.payload.isOpen;
            if (action.payload.partner) {
                state.selectedPartner = action.payload.partner;
            }
        },
        setModalDeletePartner: (state, action: PayloadAction<{ isOpen: boolean; partner?: PartnerType | null }>) => {
            state.isOpenModalDeletePartner = action.payload.isOpen;
            if (action.payload.partner) {
                state.selectedPartner = action.payload.partner;
            }
        },
        setNavId: (state, action: PayloadAction<number>) => {
            state.navId = action.payload;
        },
        setTabId: (state, action: PayloadAction<number>) => {
            state.tabId = action.payload;
        },
        setFormValue: (state, action: { payload: { name: keyof any; value: any } }) => {
            state.formValue[action.payload.name] = action.payload.value;
        },
        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        }
    },
    extraReducers: (builder) => {
        // Fetch partners
        builder
            .addCase(fetchPartner.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPartner.fulfilled, (state, action: PayloadAction<{ data: PartnerType[] }>) => {
                state.status = "succeeded";
                state.partnerData = action.payload.data;
            })
            .addCase(fetchPartner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Erreur lors de la récupération des partenaires.";
            });

        // Create partner
        builder
            .addCase(createPartner.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createPartner.fulfilled, (state, action: PayloadAction<{ data: PartnerType }>) => {
                state.status = "succeeded";
                state.partnerData.push(action.payload.data);
            })
            .addCase(createPartner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Erreur lors de la création du partenaire.";
            });

        // Delete partner
        builder
            .addCase(deletePartner.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deletePartner.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "succeeded";
                state.partnerData = state.partnerData.filter((partner) => partner.id !== action.payload);
            })
            .addCase(deletePartner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Erreur lors de la suppression du partenaire.";
            });

        // Update partner
        builder
            .addCase(updatePartner.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updatePartner.fulfilled, (state, action: PayloadAction<{ data: PartnerType }>) => {
                state.status = "succeeded";
                const updatedPartnerIndex = state.partnerData.findIndex((partner) => partner.id === action.payload.data.id);
                if (updatedPartnerIndex >= 0) {
                    state.partnerData[updatedPartnerIndex] = action.payload.data;
                }
            })
            .addCase(updatePartner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Erreur lors de la mise à jour du partenaire.";
            });
    }
});

export const {
    setModalCreatePartner,
    setModalEditPartner,
    setModalDeletePartner,
    setNavId,
    setTabId,
    setFormValue,
    setFilterToggle
} = PartnerSlice.actions;

export default PartnerSlice.reducer;

