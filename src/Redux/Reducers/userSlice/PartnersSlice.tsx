import { ProductItemInterface, ProductSliceProp } from "@/Types/Users/Partners/PartnersTypes";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState :ProductSliceProp = {
    filterToggle: false,
    productItem: [],
    symbol: "$",
};

export const fetchProductApiData = createAsyncThunk<ProductItemInterface[], void, {}>("/api/productapi", async () => {
    const response = await axios.get("/api/productapi");
    return response.data;
});

const PartnersSlice = createSlice({
    name: "PartnersSlice",
    initialState,
    reducers: {
        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductApiData.fulfilled, (state, action) => {
            state.productItem = action.payload;
        });
    },
});

export const { setFilterToggle } = PartnersSlice.actions;

export default PartnersSlice.reducer;