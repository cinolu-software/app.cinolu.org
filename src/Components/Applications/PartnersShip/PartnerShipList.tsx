import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {PartnerShipType, InitialStatePartnerShipType} from "@/Types/PartnerShipTypes/PartnerShipType";
import {an} from "@fullcalendar/core/internal-common";

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
}

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
    async (newPartnerShip, {rejectWithValue}) => {
       try{
            const response = await axiosInstance.post<{data: PartnerShipType}>(`${apiBaseUrl}/partnerships`, newPartnerShip);
            return {data: response.data.data};
       } catch (error: any){
            return rejectWithValue(error.response?.data || "Une erreur est survenue lors de la création de l'utilisateur.");
       }
    }
);

export const deletePartnerShip = createAsyncThunk(
    'partnerShip/deletePartnerShip',
    async (id: string, {rejectWithValue}) => {
        try{
            await axiosInstance.delete(`${apiBaseUrl}/partnerships/${id}`);
            return id;
        } catch (error: any){
            return rejectWithValue(error.response?.data || "Une erreur est survenue lors de la suppression de l'utilisateur.");
        }
    }
);

export const updatePartnerShip = createAsyncThunk(
    'partnerShip/updatePartnerShip',
    async (partnerShip: PartnerShipType, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.put<{data: PartnerShipType}>(`${apiBaseUrl}/partnerships/${partnerShip.id}`, partnerShip);
            return {data: response.data.data};
        } catch (error: any){
            return rejectWithValue(error.response?.data || "Une erreur est survenue lors de la modification de l'utilisateur.");
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
        setNavId: (state, action: PayloadAction<number>) => {
            state.navId = action.payload
        },
        setTabId: (state, action: PayloadAction<number>) => {
            state.tabId = action.payload
        }
    }
})