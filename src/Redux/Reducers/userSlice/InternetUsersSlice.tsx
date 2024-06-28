import { ProductItemInterface, ProductSliceProp } from "@/Types/Users/InternetUsers/InternetUsersType";

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

const InternetUsersSlice = createSlice({
    name: "InternetUsersSlice",
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

export const { setFilterToggle } = InternetUsersSlice.actions;

export default InternetUsersSlice.reducer;