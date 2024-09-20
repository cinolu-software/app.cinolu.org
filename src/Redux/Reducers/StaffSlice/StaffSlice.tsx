import { StaffItemInterface, StaffSliceProp } from '@/Types/StaffTypes/StaffTypes';
import {StaffData} from "@/Data/Application/Staff";
import {createSlice} from "@reduxjs/toolkit";

const initialState : StaffSliceProp = {
    filterToggle: false,
    productItem: StaffData,
    symbol: '$'
}

const StaffSlice = createSlice({
    name: "StaffSlice",
    initialState,
    reducers: {
        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle
        }
    }
})

export const {setFilterToggle} = StaffSlice.actions;

export default StaffSlice.reducer;

