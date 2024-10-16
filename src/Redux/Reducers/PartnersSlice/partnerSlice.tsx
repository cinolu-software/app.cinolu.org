import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {PartnerType, InitialStatePatnerType} from "@/Types/PartnerType/PartnerType";


const initialState: InitialStatePatnerType = {
    partnerData: [],
    status: 'idle',
    filterToggle: false,
    error: null,
    isOpenModalCreatePartner: false,
    isOpenModalEditPartner: false,
    isOpenModalDeletePartner: false,
    selectedPartner: null,
    navId: 1,
    tabId: 1,
    formValue: {
        name: "",
        description: "",
        profile: "",
        partnership: []
    }
}

const PartnersSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: {
        setModalCreateUser: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreatePartner = action.payload.isOpen;
        },
        setModalEditUser: (state, action: PayloadAction<{ isOpen: boolean; partner?: PartnerType | null }>) => {
            state.isOpenModalEditPartner = action.payload.isOpen;
            if (action.payload.partner) {
                state.selectedPartner = action.payload.partner;
            }
        },
        setNavId:(state, action: PayloadAction<number>)=>{
            state.navId = action.payload
        },
        setTabId:(state, action: PayloadAction<number>) =>{
            state.tabId = action.payload;
        }
        ,
        setFormValue: (state, action: { payload: { name: keyof any, value: any } }) => {
            state.formValue[action.payload.name] = action.payload.value;
        },
        setModalDeleteUser: (state, action: PayloadAction<{ isOpen: boolean; user?: PartnerType | null }>) => {
            state.isOpenModalDeletePartner = action.payload.isOpen;
            if (action.payload.user) {
                state.selectedPartner = action.payload.user;
            }
        },
        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        }
    },
    extraReducers: (builder)=>{

    }
})

export default PartnersSlice.reducer
