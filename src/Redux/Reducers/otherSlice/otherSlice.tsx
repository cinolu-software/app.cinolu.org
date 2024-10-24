import { ProjectListData } from "@/Data/Application/other";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {activeTab: string, createdFormData: any} = {
    activeTab: "1",
    createdFormData: ProjectListData,
};

const OtherSlice = createSlice({
    name: "SideBarSlice",
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        setCreatedData: (state, action) => {
            state.createdFormData = action.payload;
        },
    },
});

export const { setActiveTab, setCreatedData } = OtherSlice.actions;

export default OtherSlice.reducer;